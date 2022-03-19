import React from "react";
import Post from '../post/index'
import './posts.css';

export default function Posts(){
    return(
        <div className="posts">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}