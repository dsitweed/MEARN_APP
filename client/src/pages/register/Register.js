import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './register.css';

const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

export default function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passValid, setPassValid] = useState('');//validation password
    const [error, setError] = useState("");

    //Chinh an hien dong thong bao loi 
    useEffect(() =>{
        //set error = rong
        setError("");
    },[username,email,password,passValid]);

    const handleSubmit = async (e) =>{
        e.preventDefault();//Chan reload lai trang do an submit form
        if (password !== passValid){
            setError("Valid password wrong!");
            return;
        }
        try{
            const res = await axios.post(baseURL + '/auth/register',{
                username: username,
                email: email,
                password: password
            });
            // console.log(res.data);
            res.data && window.location.replace('/login');
        }
        catch (err){
            console.log("Err register:", err);
            setError("Something went wrong!");
        }
    }
    return(
        <div className='register'>
            <span className='registerTitle'>Register</span>
            <form className='registerForm'>
                <label>Username</label>
                <input className='registerInput' type="text" placeholder='username' 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input className='registerInput' type="text" placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input className='registerInput' type="password" placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password verification</label>
                <input className='registerInput' type="password" placeholder='password verification'
                    onChange={(e) => setPassValid(e.target.value)}
                />
                <button className='registerButton'
                    onClick={handleSubmit}
                >Register</button>
            </form>
            <button className='registerLoginButton'>
                <Link className='link' to='/login'>LOGIN</Link>
            </button>
            {
                error && 
                <span style={{marginTop:10 , color:'red'}}>{error}</span>
            }
        </div>
    );
}