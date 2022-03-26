import { createSlice } from "@reduxjs/toolkit";

export const todoListSlice = createSlice({
    name: "todoList",
    initialState: [
        {id: 1, name: "Learn Redux", completed: false, priority: "High"},
        {id: 2, name: "Learn Router", completed: false, priority: "Medium"},
        {id: 3, name: "Learn Mui", completed: false, priority: "Low"},
    ],
    reducers: {
        addTodoList: (state, action) => {
            state.push(action.payload);
        },
        toggleCompleted: (state, action) => {
            var todo = state.find((e) => {
                //xet neu id bang nhau
                return(e.id === action.payload);
            })
            todo.completed = !todo.completed;
        }
    }
});

export const {addTodoList, toggleCompleted} = todoListSlice.actions;

//=> return todoListReducer ?
export default todoListSlice.reducer;