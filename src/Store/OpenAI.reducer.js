import { createSlice } from '@reduxjs/toolkit';

export const OpenAISlice = createSlice({
  name: 'OpenAI',
  initialState: { 
    apiKey: '',
    prompt: ''
  },
  reducers: {
    setApiKey(state, {payload}) {
      state.apiKey = payload;
    },
    setPrompt(state, {payload}) {
      state.prompt = payload;
    }
  }
});

export const {setApiKey, setPrompt} = OpenAISlice.actions
export default OpenAISlice.reducer