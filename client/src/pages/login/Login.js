import React from 'react';
import { Link } from "react-router-dom";
import './login.css';

export default function Login(){
    return(
        <div className='login'>
            <span className='loginTitle'>Login</span>
            <form className='loginForm'>
                <label>Email</label>
                <input className='loginInput' type="text" placeholder='email'></input>
                <label>Password</label>
                <input className='loginInput' type="password" placeholder='password'></input>
                <button className='loginButton'>Login</button>
            </form>
            <button className='loginRegisterButton'>
                <Link className='link' to='/register'>REGSITER</Link>
            </button>
        </div>
    );
}