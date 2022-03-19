import React from "react";
import './post.css';

export default function Post(){
    return(
        <div className="post">
            <img
                className="postImg"
                src="./img_1.jpg"
                alt="img" 
            />
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">Music</span>
                    <span className="postCat">Life</span>
                </div>
                <span className="postTitle">
                    This is title of post
                </span>
                <hr />
                <span className="postDate">1 hour ago</span> 
            </div>
            <p className="postDesc">
                test wordasdddddddddddddddddddasddddddsadasasdsasasdskk|
                test wordasdddddddddddddddddddasdddddd
                test wordasdddddddddddddddddddasdddddd
                asdfasdfadsssssssssssssssssssssssssssssssss
                asdfasdfadsssssssssssssssssssssssssssssssssasdf
                adsf
                asdfasdfadsssssssssssssssssssssssssssssssssa
            </p>
        </div>
    );
}