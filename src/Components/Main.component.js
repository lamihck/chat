import 'antd/dist/reset.css';
import { useEffect, useState } from 'react';
import { Bottom, Fill, Top, ViewPort } from 'react-spaces';
import { createChatCompletion } from '../Api/Api.js';
import { Body } from './Body/Body.component.js';
import { Footer } from './Footer/Footer.component.js';
import { Header } from './Header/Header.component.js';
import { SpaceAutoHeight } from './Helper/SpaceAutoHeight.component.js';
import style from './Main.module.css';

const COOKIE_API_KEY = "apiKey";

export const Main = () => {

  const [history, setHistory] = useState([])
  const addHistory = (value) => {
    if(Array.isArray(value)) value.forEach(addHistory)
    else setHistory(prev => [...prev, value])
  }
  const updateLastHistory = (value) => {
    setHistory(prev => {
      let lastHistory = prev[prev.length - 1]
      if(lastHistory && lastHistory.direction == 'left'){
        prev.pop()
        return [...prev, {...lastHistory, text: value}]
      }
      else {
        return [...prev, {direction: 'left', text: value}]
      }
    })
  }

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const myParamValue = params.get(COOKIE_API_KEY);
    setApiKey(myParamValue);
  }, []);

  const onSend = async (text) => {
    addHistory([{text, direction: 'right'}])
    createChatCompletion(apiKey, 'gpt-3.5-turbo', text, history.map(({text, direction}) => ({content: text, role: direction == 'right' ? 'user' : 'assistant'})), onResponse)
  }

  const onResponse = (text) => {
    updateLastHistory(text)
  }

  return (
    <ViewPort className={style.Viewport}>
      <Top size={32}>
        <Header />
      </Top>
      <Fill>
        <Body history={history}/>
      </Fill>
      <SpaceAutoHeight Space={Bottom} margin={10}>
        <Footer onSend={onSend}/>
      </SpaceAutoHeight>
    </ViewPort>
  )
}