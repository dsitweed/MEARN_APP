import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import './singlePost.css';
import { Button } from "@mui/material";

export default function SinglePost() {
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [edit, setEdit] = useState(false);
    const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";
    //Duong dan luu piture
    const PF = process.env.REACT_APP_PICTURE_FOLDER || "http://localhost:5000/images"
    //Dung de lay duong dan location
    const location = useLocation();
    //Loc ra id cua bai post -> xu li tiep
    const path = location.pathname.split('/');
    const id = path[path.length-1];//co the thay = path.pop();
    useEffect(async () => {
        const getPost = await axios.get(baseURL + '/posts/' + id); 
        // console.log(getPost;
        setPost(getPost.data);
        setTitle(getPost.data.title);
        setDesc(getPost.data.desc);
    }, [id]);

    const handleEdit = () => {
        setEdit(true);
    }

    const handleDelete = async () => {
        //Cau lenh delete phai dung them data
        const res = await axios.delete(baseURL + '/posts/' + id, {
            data:{
                username: post.username
            }
        });
        console.log(res);
        window.location.replace("/");
    }
    const handleCompleted = async () => {
        const res = await axios.put(baseURL + '/posts/' + id, {
            title: title,
            desc: desc,
            username: post.username
        })
        setEdit(false);
        console.log(res);
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {
                    post.photo && 
                    <img
                        className="singlePostImg"
                        src={ `${PF}/${post.photo}` || "./img_1.jpg"}
                        alt="img"
                    />
                }
                <h1 className="singlePostTitle" 
                >
                    {/* Big title */}
                    <ContentEditable
                        html={title}
                        disabled={!edit}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="singlePostEdit">
                        <Edit className="singlePostIcon" 
                            onClick={handleEdit}
                            />
                        <Delete className="singlePostIcon" 
                            onClick={handleDelete}
                            />
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
                <ContentEditable
                    className="singlePostDesc"
                    html={desc}
                    disabled={!edit}
                    onChange={(e) => setDesc(e.target.value)}
                />
                {
                    edit && 
                    <Button variant="contained" color="success"
                        sx={{margin:2,
                        float: "right"
                        }}
                        onClick={handleCompleted}
                    >
                        Completed
                    </Button>
                }
            </div>
        </div>
    );
}

//tam thoi nhu vay 
function dateFomat(date){
    return new Date(date).toDateString();
}