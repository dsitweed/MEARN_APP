import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import './singlePost.css';

export default function SinglePost() {
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img
                    className="singlePostImg"
                    src="./moutain_1.jpg"
                    alt="img"
                />
                <h1 className="singlePostTitle">
                    Big title
                    <div className="singlePostEdit">
                        <Edit className="singlePostIcon" />
                        <Delete className="singlePostIcon" />
                    </div>
                </h1>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: <b>Ky</b>
                    </span>
                    <span className="singlePostDate">
                        1 hour ago
                    </span>
                </div>
                <p className="singlePostDesc">
                    Ldfadsaaaaaaaaaaaaaaasdffffffffffffffffffffffffffffffffffffffaaaaaaaaaaaaaaaaaaasadsadasdaaaaaaaaaaaaaaaaaasadasd
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaasdasdaaaaaaaaaaaaaaaaaaaaaaaaaasddddddddddddddddddddddddddddddddddddd
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaasdasdaaaaaaaaaaaaaaaaaaaaaaaaa
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    adfadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
            </div>
        </div>
    );
}