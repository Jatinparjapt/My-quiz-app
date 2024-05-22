import {createSlice  , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
const initialState = {
    data : null,
    isLoading : false,
    score : 0,
    name : null
}
export const sendQuestionToDatabase = createAsyncThunk('quiz/sendQuestionToDatabase',
async (quizData, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://world-wide-news.onrender.com/api/addQuestions', quizData); // Replace '/api/quiz' with your API endpoint
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
const quizSlice = createSlice({
    name : "quizSlice",
    initialState,
    reducers : {
        setUserScore : (state ,action)=>{
            state.score = action.payload
        },
        setUserName : (state ,action)=>{
            state.name = action.payload
        }
    },
   extraReducers :(builder)=> {
    builder.addCase(sendQuestionToDatabase.fulfilled, (state,action)=>{
        state.data = action.payload
    }).addCase(sendQuestionToDatabase.pending, (state,)=>{
        state.isLoading = true
    }).addCase(sendQuestionToDatabase.rejected, (state,)=>{
        state.isLoading =false
    })
   }
})
export const { setUserScore ,setUserName } = quizSlice.actions;
export default quizSlice.reducer;