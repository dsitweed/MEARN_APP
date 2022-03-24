import { AccountCircle } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../../components/sidebar';
import './settings.css';
import { deleteAccount, updateUser } from '../../redux/userSlice';

export default function Settings(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validPass, setValidPass] = useState("");
    const [file, setFile] = useState(null);
    const [mess, setMess] = useState("");
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const UPDATE_SUCCESS = "Update success!"
    const baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:5000/api";
    const PF = process.env.REACT_APP_PICTURE_FOLDER || "http://localhost:5000/images";

    useEffect(() => {
        setMess("");
    }, [username, email, password, validPass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== validPass){
            setMess("The password confirmation does not match");
            return;
        }
        try {
            const newUser = {
                userId: user._id,
                username: username,
                email: email,
                password: password
            }
            if (file){
                const data = new FormData();
                const extenFile = file.name.split('.');
                const filename = 'file' + '-' + Date.now() + '.' + extenFile.pop();
                data.append("name", filename);
                data.append("file", file);
                newUser.profilePic = filename;
                const res = await axios.post(baseURL + '/upload', data);
                
            }
            const res = await axios.put(baseURL + '/users/' + user._id, newUser);
            dispatch(updateUser(newUser));
            setMess(UPDATE_SUCCESS);
            // console.log(res.data);
        }
        catch(err){
            console.log(err);
            setMess("Something went wrong!");
        }
    }

    const handleDeleteAccount = async () => {
        try {
         const res = await axios.delete(baseURL + '/users/' + user._id, {
            data: {
                userId : user._id
            }
         });
         dispatch(deleteAccount());
         window.location.reload();   
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div className='settings'>
            <div className='settingsWrapper'>
                <div className='settingsTitle'>
                    <span className='settingsUpdateTitle'>Update your account</span>
                    <span className='settingsDeleteTitle' 
                        onClick={handleDeleteAccount}
                    >
                        Delete Account</span>
                </div>
                <form
                    className='settingsForm'
                >
                    <label >Profile picture</label>
                    <div className='settingsPP'>
                        <img 
                            className='settingsPPImg'
                            src={file ? URL.createObjectURL(file) : 
                                user.profilePic ? `${PF}/${user.profilePic}` : './logo_bear.png'}
                            alt='img'
                        />
                        <label htmlFor='fileInput'>
                            <AccountCircle 
                                style={{
                                    cursor:"pointer"
                                }}
                            />
                        </label>
                        <input type="file" accept="image/*" id="fileInput" style={{display:"none"}}
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <TextField className="writeInput" label="Username" variant="standard" 
                        placeholder={user.username}
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField className="writeInput" label="Email" variant="standard" 
                        placeholder={user.email}
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField className="writeInput" label="New Password" variant="standard" 
                        // placeholder={user.password}
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField className="writeInput" label="Confirm password" variant="standard" 
                        // placeholder={user.password}
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        type="password"
                        onChange={e => setValidPass(e.target.value)}
                    />
                    <button className='settingsSubmit'
                        disabled={!username || !email || !password || !validPass}
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                </form>
                <div className='settingsMess'>
                {
                    (mess === UPDATE_SUCCESS) ?  
                        <span style={{marginTop:10 , color:'green'}}>{mess}</span> :
                        <span style={{marginTop:10 , color:'red'}}>{mess}</span>
                }
                </div>
            </div>
            <SideBar />
        </div>
    );
}