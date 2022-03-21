import React from "react";
import { Link } from "react-router-dom";
import './post.css';

export default function Post({post}){
    // console.log(post);
    // line 22 cat.name or cat
    return(
        <div className="post">
            {   //Photo is ready
                post.photo ?<></> :
                <img
                    className="postImg"
                    src="./img_1.jpg"
                    alt="img" 
                />
            }
            <div className="postInfo">
                <div className="postCats">
                    {
                        post.categories.map(cat => (
                            <span className="postCat">{cat.name}</span>
                        ))
                    }
                </div>
                {/* LInk to single post */}
                <Link to={'/post/' + post._id} className="link">
                    <span className="postTitle">
                        {/* This is title of post */}
                        {post.title}
                    </span>
                </Link>
                <hr />
                <span className="postDate">
                    {/* 1 hour ago */}
                    {dateFomat(post.createdAt)}
                </span> 
            </div>
            <p className="postDesc">
                {/* test wordasdddddddddddddddddddasddddddsadasasdsasasdskk| */}
                {post.desc}
            </p>
        </div>
    );
}

/*
    1 post co :
    title: string
    img: string
    desc: string
 */

//tam thoi nhu vay 
function dateFomat(date){
    return new Date(date).toDateString();
}