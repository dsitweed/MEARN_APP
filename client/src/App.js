import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import DragDrop from "./components/dragDrop/DragDrop";
import SideBar from "./components/sidebar";

import TopBar from "./components/topbar";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

function App() {
  const state = useSelector(state => state.user);
  const user = state.user;
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" 
          element={user ? <Home /> : <Login />} 
        />
        <Route path="/register" 
          element={user? <Home /> : <Register />} 
        />
        <Route path="/settings" 
          element={user ? <Settings /> : <Register />} 
        />
        <Route path="/write" 
          element={user ? <Write /> : <Register />} 
        />
        <Route path="/post/:postId" 
          element={<Single />}
        />
      </Routes>
    </div>
  );
}

export default App;
