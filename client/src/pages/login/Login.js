import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './login.css';
import { useDispatch, useSelector } from 'react-redux'; 
import { loginFailed, loginStart, loginSuccess } from '../../redux/userSlice';

const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

export default function Login(){
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const state = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {   
        setError("");
    }, [user, pass]);

    // console.log(state);
    const handleSubmit = async (e) =>{
        e.preventDefault();
        // console.log(userRef.current.value, passRef.current.value);
        dispatch(loginStart());
        try{
            const res = await axios.post(baseURL + '/auth/login', {
                username: user,
                password: pass
            });
            dispatch(loginSuccess(res.data));
            // res.data && window.location.reload();
        }
        catch(err){
            console.log(err);
            dispatch(loginFailed());
            setError("Login failed!");
        }
    }
    return(
        <div className='login'>
            <span className='loginTitle'>Login</span>
            <form className='loginForm'>
                <label>Username</label>
                <input className='loginInput' type="text" placeholder='username'
                    onChange={e => setUser(e.target.value)}
                    value={user}
                />
                <label>Password</label>
                <input className='loginInput' type="password" placeholder='password'
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                />
                <button className='loginButton' disabled={!user || !pass}
                    onClick={handleSubmit}
                >Login</button>
            </form>
            <button className='loginRegisterButton'>
                <Link className='link' to='/register'>REGSITER</Link>
            </button>
            {
                error && 
                <span style={{marginTop:10 , color:'red'}}>{error}</span>
            }
        </div>
    );
}