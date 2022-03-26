import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: "filter",
    initialState: {
        search: '',
        status: 'All',
        priority: []
    },
    reducers: {
        addSearchInput: (state, action) => {
            state.search = action.payload;
        },
        statusFilterChange: (state, action) => {
            state.status = action.payload;
        },
        priorityFilterChange: (state, action) => {
            state.priority = action.payload;
        }
    }
});

export const {addSearchInput, statusFilterChange, priorityFilterChange} = filterSlice.actions;

export default filterSlice.reducer;
