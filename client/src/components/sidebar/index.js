import { Facebook, GitHub } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './sidebar.css';
import { Link } from "react-router-dom";



export default function SideBar(){
    const [cats, setCats] = useState([]);

    const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";
    const PF = process.env.REACT_APP_PICTURE_FOLDER || "http://localhost:5000/images";

    useEffect(async () => {
        const categories = await axios.get(baseURL + '/categories');
        // console.log(categories.data);
        setCats(categories.data);
    }, [cats]);
    return(
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className="sidebarImg" src={PF + "/about_me.png"} 
                    alt="sideimg"
                />
                <p>
                    1adfadfafafafdafadsffffffffasdffaasd
                    fadsffffffffffffffasdffffffasdfasdas
                    adsfasdfadsf
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {
                        cats.map((cat) => (
                            <Link to={`/?cat=${cat.name}`} className="link" key={cat._id}>
                                <li className="sidebarListItem">{cat.name}</li>
                            </Link>
                        ))
                    }
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