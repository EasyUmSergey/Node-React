import {connection} from "../dbHelper.js";
import HmacSHA256 from "crypto-js/hmac-sha256.js";
import {v4} from "uuid";

export class User{
    static login(req, res){
        let email = req.body.email.toLowerCase();
        let conn = connection();
        conn.query("SELECT * FROM users WHERE email=?", [email], function (err, res1){
            console.log(res1);
            if(res1.length){
                let pass = (HmacSHA256(req.body.pass, 'secret').toString());
                if(pass === res1[0].pass){
                    let uid = v4();
                    conn.query("UPDATE users SET token = ? WHERE id = ?",
                        [uid, res1[0].id]);
                    res.cookie('token', uid);
                    res.json({result: "success"});
                }else {
                    res.json({result: "error"});
                }
            }
            else{
                res.send("error");
            }
            conn.end();
        });
    }

    static logout(req, res){
        res.clearCookie('token');
        res.json({result: "success"});
    }

    static tokenAuth(req, callback){
        let token = req.cookies['token']==null?undefined:req.cookies['token'];
        let conn = connection();
        conn.query("SELECT id FROM users WHERE token=?",
            [token], (err, resultSet)=>{
                if(resultSet.length){
                    callback(true);
                } else {
                    callback(false);
                }
                conn.end();
            });
    }
    static getUserData(req, res){
        User.tokenAuth(req, (auth)=>{
            let token = req.cookies['token']==null?undefined:req.cookies['token'];
            if(auth){
                let conn = connection();
                conn.execute("SELECT * FROM users WHERE token=?", [token],
                (err, resultSet)=>{
                    res.json({result: resultSet[0]});
                    conn.end();
                })
            }else{
                res.json({result: "error"})
            }
        });

    }
}