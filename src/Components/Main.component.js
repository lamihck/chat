import 'antd/dist/reset.css';
import { useDispatch, useSelector } from 'react-redux';
import { Bottom, Fill, Top, ViewPort } from 'react-spaces';
import { sendQuery } from '../Store/OpenAI.reducer.js';
import { ApiKey } from './ApiKey.component.js';
import { Body } from './Body/Body.component.js';
import { Footer } from './Footer/Footer.component.js';
import { Header } from './Header/Header.component.js';
import { SpaceAutoHeight } from './Helper/SpaceAutoHeight.component.js';
import style from './Main.module.css';

export const Main = () => {
  const dispatch = useDispatch()
  const history = useSelector(({history}) => history.history)
  
  const onSend = async (text) => {
    dispatch(sendQuery(text))
  }

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