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
            state.user = action.payload;
            // state.user_name = getCookie("user_id"); // ko hieu sao doi cai nay thi moi reaload lai trang
                                //Co the la do thay doi init state
        },
        loginFailed: (state, action) =>{
            state.error = "Login failed!";
        },
        logOut: (state, action) =>{
            state.user = null;
            localStorage.clear();
        }
    }
});
//Action creator
export const {loginStart, loginSuccess, loginFailed, logOut} = userSlice.actions;

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