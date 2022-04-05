import React from "react";
import { Link } from "react-router-dom";
import './post.css';

export default function Post({post}){
    const PF = process.env.REACT_APP_PICTURE_FOLDER || "http://localhost:5000/images"
    // line 22 cat.name or cat
    return(
        <div className="post">
            {   //Photo is ready
                post.photo &&
                <img
                    className="postImg"
                    src={ `${PF}/${post.photo}` || "./img_1.jpg"}
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
                <span className="postAuthor">
                    {`Author: ${post.username}`}
                </span>
                <span className="postDate">
                    {/* 1 hour ago */}
                    {dateFomat(post.createdAt)}
                </span> 
            </div>
            <p className="postDesc">
                {
                    post.roomNumber && 
                    <>
                        <b>Phòng số:</b>{` P${post.roomNumber}`}
                        <br></br>
                    </>
                }
                {
                    post.roomPrice && 
                    <>
                        <b>Giá tiền:</b>{` ${post.roomPrice}`}
                        <br></br>
                    </>
                }
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