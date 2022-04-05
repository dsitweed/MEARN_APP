import { Delete, Edit, FastfoodOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import { useSelector } from "react-redux";
import "./singlePost.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DragDrop from "../dragDrop/DragDrop";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [edit, setEdit] = useState(false);
  const [mess, setMess] = useState("");
  const [cats, setCats] = useState([
    {
      _id: "1",
      name: "none",
    },
    {
        _id: "2",
      name: "none",
    }
  ]);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const baseURL =
    process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";
  //Duong dan luu piture
  const PF =
    process.env.REACT_APP_PICTURE_FOLDER || "http://localhost:5000/images";
  //Dung de lay duong dan location
  const location = useLocation();
  //Loc ra id cua bai post -> xu li tiep
  const path = location.pathname.split("/");
  const id = path[path.length - 1]; //co the thay = path.pop();
  useEffect(async () => {
    const getPost = await axios.get(baseURL + "/posts/" + id);
    // console.log(getPost;
    setPost(getPost.data);
    setTitle(getPost.data.title);
    setDesc(getPost.data.desc);
    setRoomNumber(getPost.data.roomNumber);
    setRoomPrice(getPost.data.roomPrice);
  }, [id]);

  const handleEdit = () => {
    if (user.username !== post.username) {
      setMess("You just can change your post!");
      return;
    }
    setEdit(true);
  };

  const handleDelete = async () => {
    //Cau lenh delete phai dung them data
    try {
      const res = await axios.delete(baseURL + "/posts/" + id, {
        data: {
          username: user.username,
        },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setMess("You just can delete your post!");
    }
  };
  const handleCompleted = async () => {
    const res = await axios.put(baseURL + "/posts/" + id, {
      title: title,
      desc: desc,
      username: post.username,
      roomNumber: roomNumber,
      roomPrice: roomPrice
    });
    setEdit(false);
    setMess("Edit completed!");
    console.log(res);
  };

  const handleClose = () => setMess("");

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlePostImg"
            src={`${PF}/${post.photo}` || "./img_1.jpg"}
            alt="img"
          />
        )}
        <h1 className="singlePostTitle">
          {/* Big title */}
          <ContentEditable
            html={title}
            disabled={!edit}
            onChange={(e) => setTitle(e.target.value)}
          />
         <div className="singlePostCats">
            <DragDrop 
                listItem={cats} 
                setListItem={setCats}
                nameList="caterogies2"
            />
         </div>
          <div className="singlePostEdit">
            <Edit className="singlePostIcon" onClick={handleEdit} />
            <Delete className="singlePostIcon" onClick={handleDelete} />
          </div>
        </h1>

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            <Link to={`/?user=${post.username}`} className="link">
              <b>
                {/*Ky*/}
                {`Author: ${post.username}`}
              </b>
            </Link>
          </span>
          <span className="singlePostDate">
            {/* 1 hour ago */}
            {dateFomat(post.createdAt)}
          </span>
        </div>
        <span>Room number</span>
        <ContentEditable
          className="singlePostRoomNumber"
          html={roomNumber}
          disabled={!edit}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <span>Room price</span>
        <ContentEditable
          className="singlePostRoomPrice"
          html={roomPrice}
          disabled={!edit}
          onChange={(e) => setRoomPrice(e.target.value)}
        />
        <span>Description</span>
        <ContentEditable
        className="singlePostDesc"
        html={desc}
        disabled={!edit}
        onChange={(e) => setDesc(e.target.value)}
      />
        {edit && (
          <Button
            variant="contained"
            color="success"
            sx={{ margin: 2, float: "right" }}
            onClick={handleCompleted}
          >
            Completed
          </Button>
        )}
      </div>
      <div className="singlePostModal">
        <Dialog open={mess} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{mess}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

//tam thoi nhu vay
function dateFomat(date) {
  return new Date(date).toDateString();
}
