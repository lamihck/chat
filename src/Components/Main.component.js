import 'antd/dist/reset.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bottom, Fill, Top, ViewPort } from 'react-spaces';
import { createChatCompletion } from '../Api/Api.js';
import { editLastHistory, pushHistory } from '../Store/History.reducer.js';
import { Body } from './Body/Body.component.js';
import { Footer } from './Footer/Footer.component.js';
import { Header } from './Header/Header.component.js';
import { SpaceAutoHeight } from './Helper/SpaceAutoHeight.component.js';
import style from './Main.module.css';

const QUERY_API_KEY = "apiKey";

export const Main = () => {
  const dispatch = useDispatch()
  const history = useSelector(({history}) => history.history)

  const addHistory = (value) => {
    if(Array.isArray(value)) value.forEach(addHistory)
    else dispatch(pushHistory(value))
  }
  const updateLastHistory = (value) => {
    dispatch(editLastHistory(value))
  }

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setApiKey(params.get(QUERY_API_KEY))
  }, []);

  const onSend = async (text) => {
    addHistory({text, direction: 'right'})
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