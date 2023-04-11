import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setToken } from './OpenAI.reducer';

export const pushHistory = createAsyncThunk(`pushHistory`, async (arg, {dispatch, _state}) => {
  dispatch(HistorySlice.actions.pushHistory(arg))
  dispatch(setToken())
})

export const editLastHistory = createAsyncThunk(`editLastHistory`, async (arg, {dispatch, _state}) => {
  dispatch(HistorySlice.actions.editLastHistory(arg))
  dispatch(setToken())
})

export const clearHistory = createAsyncThunk(`clearHistory`, async (arg, {dispatch, _state}) => {
  dispatch(HistorySlice.actions.clearHistory(arg))
  dispatch(setToken())
})

const roles = {
  system: 'system',
  user: 'user',
  assistant: 'assistant'
}

export const HistorySlice = createSlice({
  name: 'History',
  initialState: { 
    history: [] 
  },
  reducers: {
    pushHistory(state, {payload}) {
      state.history = [...state.history, payload];
    },
    setHistory(state, {payload}) {
      state.history = payload;
    },
    editLastHistory(state, {payload}) {
      let prev = state.history
      let lastHistory = prev[prev.length - 1]
      if(lastHistory && lastHistory.role == roles.assistant){
        prev.pop()
        state.history = [...prev, {...lastHistory, content: payload}]
      }
      else {
        state.history = [...prev, {role: roles.assistant, content: payload}]
      }
    },
    clearHistory(state) {
      state.history = []
    }
  }
});

export const {setHistory} = HistorySlice.actions
export default HistorySlice.reducer