import { AddPhotoAlternate } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import './write.css';
import { useSelector } from "react-redux";

const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

export default function Write(){
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const user = useSelector(state => state.user.user);
    
    const handleSubmit = async (e) =>{
        try{
            const newPost = {
                title: title,
                desc: desc,
                username: user.username
            }
            if (file){
                const data = new FormData();
                const filename = file.name;
                data.append("name", filename);
                data.append("file", file);
                const res = await axios.post(baseURL + '/upload', data);
                newPost.photo(file);
                console.log(newPost, file);
            }
            // const res = await axios.post(baseURL + '/posts', newPost);
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className="write">
            {
                file &&
                    <img
                        className="writeImg"
                        // Qua hay URL -> tao 1 anh theo lua chon
                        src= { URL.createObjectURL(file) || "./img_3.jpg" }
                        alt="img"
                    />
            }
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <AddPhotoAlternate 
                            className="writeIcon"
                        />
                    </label>
                    <input type="file" accept="image/*" id="fileInput" style={{display:"none"}}
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            // console.log(e.target.files);
                        }}
                    />
                    <TextField className="writeInput" label="Title" variant="standard" 
                        autoFocus={true}
                        InputProps={{ style: { fontSize: 30 } }}
                        InputLabelProps={{ style: { fontSize: 30 } }}
                        onChange={e => {setTitle(e.target.value)}}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                        placeholder="Input text" 
                        className="writeInput writeText"
                        rows={50}
                        onChange={e => {setDesc(e.target.value)}}
                    >
                    </textarea>
                </div>
                <Button 
                    className="writeSubmit"
                    variant="contained" 
                    color="success"
                    sx={{
                        position:"absolute",
                        top:20,
                        right:50,
                    }}
                    onClick={handleSubmit}
                >
                    Publish
                </Button>
            </form>
        </div>
    );
}