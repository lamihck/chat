import 'antd/dist/reset.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bottom, Fill, Top, ViewPort } from 'react-spaces';
import { useChatCompletion } from '../Api/useChatCompletion.js';
import { setHistory } from '../Store/History.reducer.js';
import { setPrompt } from '../Store/OpenAI.reducer.js';
import { ApiKey } from './ApiKey.component.js';
import { Body } from './Body/Body.component.js';
import { Footer } from './Footer/Footer.component.js';
import { Header } from './Header/Header.component.js';
import { SpaceAutoHeight } from './Helper/SpaceAutoHeight.component.js';
import style from './Main.module.css';

export const Main = () => {
  const dispatch = useDispatch()
  const history = useSelector(({history}) => history.history)

  const apiKey = useSelector(({openAI}) => openAI.apiKey)
  const model = useSelector(({openAI}) => openAI.model)
  const prompt = useSelector(({openAI}) => openAI.prompt)
  const [messages, submitQuery] = useChatCompletion({apiKey, model})
  
  const onSend = async (text) => {
    if(text.startsWith('/')){
      dispatch(setPrompt(`Tu es un ${text.substring(1)} expert avec 20 ans d'experience. Tu peux poser des questions pour affiner tes réponses.`))
    }
    else {
      submitQuery([{content: text, role: 'user'}])
    }
  }

  useEffect(() => {
    submitQuery([{content: prompt, role: 'system'}])
  }, [prompt])

  useEffect(() => {
    submitQuery(history)
    submitQuery([{content: prompt, role: 'system'}])
  }, [])

  useEffect(() => {
    if(history.length == 0 && messages.length != 0)
      submitQuery(history)
  }, [history])

  useEffect(() => {
    dispatch(setHistory(messages))
  }, [messages])

  return (
    <ViewPort className={style.Viewport}>
      <ApiKey/>
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