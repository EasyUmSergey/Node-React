import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
function Post(props){
    return (
        <div className="post-preview">
            <Link to={`/article/${props.id}`}>
                <h2 className="post-title">{props.title}</h2>
                <h3 className="post-subtitle">Problems look mighty small from 150 miles up</h3>
            </Link>
            <p className="post-meta">
                Posted by
                <a href="#!">Start Bootstrap</a>
                on September 24, 2022
            </p>
        </div>
    )
}

function AddPostBtn(){
    return (<Link to="/addPost">Добавить статью</Link>)
}

export function Posts(){
    const [posts, setPosts] = useState([]);
    const [addPostBtn, setAddPostBtn] = useState([]);
    useEffect(()=>{
        document.getElementById("h1Title").innerText = "Главная";
        fetch('/article')
            .then(respone=>respone.json())
            .then(result=>{
                setPosts(result.map(item=><Post key={item.id} title={item.title} id={item.id}/>));
            });
    }, []);
    useEffect(()=>{
        fetch('/userData')
            .then(response=>response.json())
            .then(result=>{
                if(result.result !== "error"){
                    setAddPostBtn([<AddPostBtn/>])
                }
            })
    }, [])

    return (
        <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
                {addPostBtn}
                {posts}
                <hr className="my-4"/>

                <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase"
                                                                    href="#!">Older Posts →</a></div>
            </div>
        </div>
    )
}