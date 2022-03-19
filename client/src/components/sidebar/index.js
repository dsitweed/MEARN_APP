import { Facebook, GitHub } from "@mui/icons-material";
import React from "react";
import './sidebar.css';

export default function SideBar(){
    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className="sidebarImg" src="./moutain_1.jpg" alt="sideimg"></img>
                <p>
                    1adfadfafafafdafadsffffffffasdffaasd
                    fadsffffffffffffffasdffffffasdfasdas
                    adsfasdfadsf
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Life</li>
                    <li className="sidebarListItem">Music</li>
                    <li className="sidebarListItem">Style</li>
                    <li className="sidebarListItem">Sport</li>
                    <li className="sidebarListItem">Tech</li>
                    <li className="sidebarListItem">Cinema</li>
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <Facebook className="sidebarIcon"></Facebook>
                    <GitHub className="sidebarIcon"></GitHub>
                </div>
            </div>
        </div>
    );
}