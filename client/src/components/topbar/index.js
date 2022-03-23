import './topbar.css';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/userSlice';

const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";

export default function TopBar(){
    const state = useSelector(state => state.user);
    const user = state.user;
    const dispatch = useDispatch();

    const PF = process.env.REACT_APP_PICTURE_FOLDER || "http://localhost:5000/images";

    async function handleLogout(){
        try{
            const res = await axios.get(baseURL + '/auth/logout');
            dispatch(logOut());
        }
        catch (err){
            console.log(err);
        }
    }

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
                    <li className='topListItem' onClick={handleLogout}>
                        {user && 'LOGOUT'}
                    </li>
                </ul>
            </div>
            <div className='topRight'>
                {
                    user ? (
                        <Link to={'/settings'}>
                            <img
                                className='topImg' 
                                src= {user.profilePic ? `${PF}/${user.profilePic}` : './logo_bear.png'} 
                                alt='person_icon'
                            />
                        </Link>
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