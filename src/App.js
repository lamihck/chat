import { Bubble } from "./Bubble";
import "./styles.css";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Bottom, Top, ViewPort } from "react-spaces";
import { createChatCompletion } from './Api/Api';
import { AutoScrollFill } from "./AutoScrollFill";
import { InputBubble } from "./InputBubble";
import { ModelSelect } from "./ModelSelect";
import { SoundButton } from "./SoundButton";




const generatecontent = (cb) => {
  let fakecontent = `😊 Bonjour \`User\`! 

\`\`\`javascript
console.info('Comment puis-je vous aider aujourd\\'hui ?')
\`\`\``
  let fakeParts = fakecontent.match(/.*\W/gm);
  new Promise(async (r) => {
    for (const fakePart of fakeParts) {
      cb(fakePart);
      await new Promise((s) => setTimeout(s, 10));
    }
  });
};

export default function App() {
  const [lastcontent, setLastcontent] = useState("");
  const [isInit, setInit] = useState(false);
  const [history, setHistory] = useState([])
  const [isMute, setMute] = useState(true)
  const [model, setModel] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()
  
  
  const [apiKey, setApiKey] = useState("");

  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const myParamValue = params.get("apiKey");
    setApiKey(myParamValue);
  }, []);

  useEffect(() => {
    console.info(cookies)
    if(cookies['history'] && cookies['history'].length > 0 && history.length <= 1) setHistory(cookies.history)
  }, [cookies])
  

  useEffect(() => {
    setCookie('history', history)
  }, [history])

  const addLastcontent = (content) => {
    setLastcontent((prevState) => prevState + content);
  };

  const addHistory = (content, role, position, mute) => {
    setHistory((prevState) => [...prevState, {content, role, position, mute}])
  }

  const addcontentOnLastHistory = (content, mute) => {
    if(content) {
      setHistory((prevState) => {
        let lastPart = prevState[prevState.length - 1]
        if(lastPart && lastPart.role == 'IA') {
          prevState.pop()
          lastPart.content = content
        }
        else {
          lastPart = {content: content, role: 'IA', position: 'left', mute}
        }
        return [...prevState, lastPart]
      })
    }
  }

  useEffect(() => {
    if (!isInit) {
      setLastcontent("")
      setInit(true)
    }
    else {
      generatecontent(addLastcontent)
    }
  }, [isInit]);

  useEffect(() => {
    setHistory(history.map(h => ({...h, mute: isMute})))
  }, [isMute])

  const onSend = async (content) => {
    addHistory(content, 'user', 'right', true)
    let acc = ""
    let finalResult = await createChatCompletion(apiKey, model, content, history, (part) => {
      acc += part
      addcontentOnLastHistory(acc, isMute)
    })
    console.info(finalResult)
  }

  const onModelChange = setModel

  return (
    <ViewPort style={{backgroundColor: '#202123'}}>
    <Top size='32px'>
      <SoundButton defaultValue={isMute} onChange={(b) => setMute(b)}/>
      <ModelSelect onChange={onModelChange}/>
    </Top>
    <AutoScrollFill scrollable={true}>
      <Bubble text={lastcontent} avatarSrc="IA" position="left" isMute={true}/>
      {history.map((h, i) => (
        <Bubble key={i} text={h.content} avatarSrc={h.role} position={h.position} isMute={h.mute} />
      ))}
      </AutoScrollFill>
      <Bottom size="171px">
        <InputBubble onSend={onSend}/>
      </Bottom>
    </ViewPort>
  );
}
