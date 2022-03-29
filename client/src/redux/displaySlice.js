import { createSlice } from '@reduxjs/toolkit';

export const displaySlice = createSlice({
    name:"display",
    initialState: {
        cats:[]
    },
    reducers: {
        changeCats: (state, action) => {
            state.cats = action.payload
        }
    }
});

export const { changeCats} = displaySlice.actions;

export default displaySlice.reducer;