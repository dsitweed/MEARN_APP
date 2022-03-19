import React from 'react';
import { Link } from "react-router-dom";
import './register.css';

export default function Register(){
    return(
        <div className='register'>
            <span className='registerTitle'>Register</span>
            <form className='registerForm'>
                <label>Email</label>
                <input className='registerInput' type="text" placeholder='email'></input>
                <label>Password</label>
                <input className='registerInput' type="password" placeholder='password'></input>
                <label>Password verification</label>
                <input className='registerInput' type="password" placeholder='password verification'></input>
                <button className='registerButton'>Register</button>
            </form>
            <button className='registerLoginButton'>
                <Link className='link' to='/login'>LOGIN</Link>
            </button>
        </div>
    );
}