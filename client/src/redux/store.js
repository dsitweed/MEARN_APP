import { configureStore } from '@reduxjs/toolkit';
import displaySlice from './displaySlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer:{
        user: userSlice,
        display: displaySlice
    }
});

export default store;