import { AccountCircle } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import React from 'react';
import SideBar from '../../components/sidebar';
import './settings.css';

export default function Settings(){
    return(
        <div className='settings'>
            <div className='settingsWrapper'>
                <div className='settingsTitle'>
                    <span className='settingsUpdateTitle'>Update your account</span>
                    <span className='settingsDeleteTitle'>Delete Account</span>
                </div>
                <form
                    className='settingsForm'
                >
                    <label >Profile picture</label>
                    <div className='settingsPP'>
                        <img 
                            className='settingsPPImg'
                            src='./img_3.jpg'
                            alt='img'
                        />
                        <label htmlFor='fileInput'>
                            <AccountCircle 
                                style={{
                                    cursor:"pointer"
                                }}
                            />
                        </label>
                        <input type="file" accept="image/*" id="fileInput" style={{display:"none"}}/>
                    </div>
                    <TextField className="writeInput" label="Username" variant="standard" 
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />
                    <TextField className="writeInput" label="Email" variant="standard" 
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />
                    <TextField className="writeInput" label="Password" variant="standard" 
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                    />
                    <button className='settingsSubmit'>
                        Update
                    </button>
                </form>
            </div>
            <SideBar />
        </div>
    );
}