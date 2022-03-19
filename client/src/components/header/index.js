import React from "react";
import './header.css';

export default function Header(){
    return(
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React App</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img className="headerImg" src="./moutain_1.jpg"></img>
        </div>
    );
}