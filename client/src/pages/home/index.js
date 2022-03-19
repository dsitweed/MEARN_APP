import React from "react";
import Header from "../../components/header";
import Posts from "../../components/posts";
import SideBar from "../../components/sidebar";
import './home.css';

export default function Home(){
    return(
       <>
        <Header />
        <div className="home">
            <Posts />
            <SideBar />
        </div>
       </>
    );
}