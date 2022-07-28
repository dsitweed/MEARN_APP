import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user : null,
        // user: {
        //     _id: "" 
        //     username : "",
        //     email: "",
        //     profilePic: "",            
        // },
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
        },
        loginFailed: (state, action) =>{
            state.error = "Login failed!";
        },
        logOut: (state, action) => {
            state.user = null;
            state.isFetching = false;
        },
        updateUser: (state, action) => {
            //Co the thu ngan lai bang cach loc bo password ra -> state.user = action.payload
            state.user.profilePic = action.payload.profilePic;
            state.user.username = action.payload.username;
            state.user.email = action.payload.email;
        },
        deleteAccount: (state, action) => {
            state.user = null;
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