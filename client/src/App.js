import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import TopBar from "./components/topbar";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { loginSuccess } from "./redux/userSlice";

function App() {
  const state = useSelector(state => state.user);
  const dispatch = useDispatch();
  var user = state.user;

  const baseURL =
  process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

  useEffect(async () => {
    if (user === null) {
      const userData = await (await axios.get(baseURL + "/auth/userdata")).data;
      if (userData) {
        dispatch(loginSuccess(userData));
        console.log(userData);
      } 
    }
  },[user]);

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
