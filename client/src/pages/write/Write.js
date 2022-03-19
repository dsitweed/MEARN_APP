import { AddPhotoAlternate } from "@mui/icons-material";
import { TextField, Button } from "@mui/material";
import React from "react";
import './write.css';

export default function Write(){
    return(
        <div className="write">
            <img
                className="writeImg"
                src="./img_3.jpg" 
                alt="img"
            />
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <AddPhotoAlternate 
                            className="writeIcon"
                        />
                    </label>
                    <input type="file" accept="image/*" id="fileInput" style={{display:"none"}}/>
                    <TextField className="writeInput" label="Title" variant="standard" 
                        autoFocus={true}
                        InputProps={{ style: { fontSize: 30 } }}
                        InputLabelProps={{ style: { fontSize: 30 } }}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                        placeholder="Input text" 
                        className="writeInput writeText"
                        rows={50}
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
                >
                    Publish
                </Button>
            </form>
        </div>
    );
}