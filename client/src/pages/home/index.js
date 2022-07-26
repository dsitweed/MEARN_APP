import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../../components/header";
import Posts from "../../components/posts";
import SideBar from "../../components/sidebar";
import './home.css';
import { useLocation } from "react-router";
import Footer from "../../components/footer/Footer";

const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

export default function Home(){
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    //search = ?user=test1
    console.log("search: ",search);

    useEffect(async () => {
        const res = await axios.get(baseURL + '/posts' + search);
        setPosts(res.data);
    },[search]);
    return(
       <>
        <Header />
        <div className="home">
            <Posts posts= {posts} />
            <SideBar />
        </div>
        <Footer />
       </>
    );
}