import './topbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function TopBar(){
    const user = true;
    return(
        <div className='top'>
            <div className='topLeft'>My MERN fullstack App</div>
            <div className='topCenter'>
                <ul className='topList'>
                    <li className='topListItem'>
                        <Link className='link' to='/'>HOME</Link>
                    </li>
                    <li className='topListItem'>
                        <Link className='link' to='/'>ABOUT</Link>
                    </li>
                    <li className='topListItem'>
                        <Link className='link' to='/'>CONTACT</Link>
                    </li>
                    <li className='topListItem'>
                        <Link className='link' to='/write'>WRITE</Link>
                    </li>
                    <li className='topListItem'>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className='topRight'>
                {
                    user ? (
                        <img
                            className='topImg' 
                            src='./logo_bear.png' 
                            alt='person_icon'
                        ></img>
                    ) : (
                        <>
                            <ul className='topList'>
                                <li className='topListItem'>
                                    <Link className='link' to='/login'>LOGIN</Link>
                                </li>
                                <li className='topListItem'>
                                    <Link className='link' to='/register'>REGISTER</Link>
                                </li>
                            </ul>
                        </>
                    )
                }
                {/* something else */}
            </div>
        </div>
    );
}