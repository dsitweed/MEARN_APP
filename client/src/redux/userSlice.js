import { stepButtonClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        // user_name: getCookie("user_id") || null, //save cookie for each user
        isFetching: false,
        error: "",
    },
    reducers: {
        loginStart: (state, action) =>{
            state.isFetching = true;
        },
        loginSuccess: (state, action) =>{
            state.isFetching = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            // state.user_name = getCookie("user_id"); // ko hieu sao doi cai nay thi moi reaload lai trang
                                //Co the la do thay doi init state
        },
        loginFailed: (state, action) =>{
            state.error = "Login failed!";
        },
        logOut: (state, action) => {
            state.user = null;
            state.isFetching = false;
            localStorage.clear();
        },
        updateUser: (state, action) => {
            //Co the thu ngan lai bang cach loc bo password ra -> state.user = action.payload
            state.user.profilePic = action.payload.profilePic;
            state.user.username = action.payload.username;
            state.user.email = action.payload.email;
            //Update data in localstorage
            const bufferUser = JSON.parse(localStorage.getItem("user"));
            bufferUser.profilePic = action.payload.profilePic;
            bufferUser.username = action.payload.username;
            bufferUser.email = action.payload.email;
            localStorage.setItem("user", JSON.stringify(bufferUser));
        },
        deleteAccount: (state, action) => {
            state.user = null;
            localStorage.clear();
            //Xoa cac bai trong trong cua username;
        }
    }
});
//Action creator
export const {loginStart, loginSuccess, loginFailed, logOut, updateUser, deleteAccount} = userSlice.actions;

export default userSlice.reducer;


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}