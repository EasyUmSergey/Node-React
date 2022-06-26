import { parse } from 'node-html-parser';
import express from 'express';
import HmacSHA256 from 'crypto-js/hmac-sha256.js';
import mysql from "mysql2";
import multer from "multer";
import cookieParser from 'cookie-parser';
import {engine} from 'express-handlebars';
import {v4} from 'uuid';
import path from "path";
import fs from 'fs';
import {Blog} from './controllers/Blog.js'
import {connection} from "./dbHelper.js";
import {User} from "./controllers/User.js";
const app = express()
const port = 3001;
const __dirname = path.resolve();
app.use(cookieParser('secret key'))
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', engine());
app.set('views', './views')
app.set('view engine', 'handlebars')

let conn = connection();




app.get('/', (req, res) => {
    res.render('home', { title: 'Greetings form Handlebars' })
});
app.get('/UserData', User.getUserData);
app.get('/cabinet', (req, res) => {
    console.log('Cookie: ', req.cookies['token']);
    let token = req.cookies['token']==null?undefined:req.cookies['token'];
    conn.query("SELECT * FROM users WHERE token=?",
        [token], function (err, result){
            console.log(result);
            if(result.length){
                let user = {
                    name: result[0].name,
                    lastname: result[0].lastname,
                    email: result[0].email
                }
                res.render('cabinet', {user});
            }else{
                res.send('Доступ запрещен');
            }
            conn.end();
        })
});
app.get('/regs', (req, res)=>{
    res.sendFile(__dirname + "/reg.html")
})
app.get('/logins', (req, res)=>{
    res.sendFile(__dirname + "/auth.html")
})
app.post('/reg', multer().fields([]), (req, res)=>{
    let sendResult  = "success";
    let email = req.body.email.toLowerCase();
    conn.query("SELECT id FROM users WHERE email=?", [email], function (err, res1){
        console.log(res1.length);
        if(res1.length){
            console.log("exist");
            sendResult = "exist";
            res.json({result: sendResult});
        }else{
            let pass = (HmacSHA256(req.body.pass, 'secret').toString());
            const user = [req.body.name, req.body.lastname, email, pass];
            conn.query("INSERT INTO `users`(`name`, `lastname`, `email`, `pass`) VALUES (?,?,?,?)", user,
                function (error, result, metadata) {
                    console.log(error);
                    console.log(result);
                    res.json({result: sendResult});
                })
        }
        conn.end();
    });

})
app.post('/login', multer().fields([]), User.login);
app.get('/logout', User.logout);

app.get('/addArticle', (req, res) =>{
    res.render('addArticle', {});
});

app.post('/addArticle', multer().fields([]), Blog.addArticle);

app.get('/article', Blog.getArticles);
app.get('/article/:id', Blog.getArticleById)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})