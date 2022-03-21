import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import './singlePost.css';

const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

export default function SinglePost() {
    const [post, setPost] = useState({});
    //Dung de lay duong dan location
    const location = useLocation();
    //Loc ra id cua bi post -> xu li tiep
    const path = location.pathname.split('/');
    const id = path[path.length-1];
    useEffect(async () => {
        const getPost = await axios.get(baseURL + '/posts/' + id); 
        // console.log(getPost);
        setPost(getPost.data);
    }, [id]);
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {
                    post.photo ? <></> :
                    <img
                        className="singlePostImg"
                        src="./moutain_1.jpg"
                        alt="img"
                    />
                }
                <h1 className="singlePostTitle">
                    {/* Big title */}
                    {post.title}
                    <div className="singlePostEdit">
                        <Edit className="singlePostIcon" />
                        <Delete className="singlePostIcon" />
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        <span>Author: </span>
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{/*Ky*/}{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {/* 1 hour ago */}
                        {dateFomat(post.createdAt)}
                    </span>
                </div>
                <p className="singlePostDesc">
                    {/* Ldfadsaaaaaaaaaaaaaaasdffffffffffffffffffffffffffffffffffdasd */}
                    {post.desc}
                </p>
            </div>
        </div>
    );
}

//tam thoi nhu vay 
function dateFomat(date){
    return new Date(date).toDateString();
}