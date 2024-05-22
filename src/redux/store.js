import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import quizSlice from "./reducer"
const rootReducer = combineReducers({
 quizSlice
})
export const store = configureStore({
    reducer : rootReducer
})