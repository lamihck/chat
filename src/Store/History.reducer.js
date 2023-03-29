import { createSlice } from '@reduxjs/toolkit';

export const HistorySlice = createSlice({
  name: 'History',
  initialState: { 
    history: [] 
  },
  reducers: {
    pushHistory(state, {payload}) {
      state.history = [...state.history, payload];
    },
    editLastHistory(state, {payload}) {
      let prev = state.history
      let lastHistory = prev[prev.length - 1]
      if(lastHistory && lastHistory.direction == 'left'){
        prev.pop()
        state.history = [...prev, {...lastHistory, text: payload}]
      }
      else {
        state.history = [...prev, {direction: 'left', text: payload}]
      }
    },
    clearHistory(state) {
      state.history = []
    }
  }
});

export const {pushHistory, editLastHistory, clearHistory} = HistorySlice.actions
export default HistorySlice.reducer