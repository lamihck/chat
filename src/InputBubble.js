import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Bubble } from "./Bubble";
import { SpeechToTextButton } from "./SpeechToTextButton";

export const InputBubble = ({onSend}) => {
  const [value, setValue] = useState("")
  
  const onStartRecording = () => {
    console.info("onStartRecording");
  };
  const onStopRecording = (e) => {
    console.info("onStopRecording", e);
    value && onSend(value, true)
    setValue("")
  };
  const onSpeechToText = (e) => {
    console.info("onSpeechToText", e);
    setValue(e)
  };

  const onClick = (e) => {
    e.preventDefault()
    value && onSend(value, false)
    setValue("")
  };

  return (
    <Bubble
      text={
        <>
        <div style={{ display: "flex", alignItems: "center", margin: 13 }}>
          <TextArea bordered={true} 
          style={{width: "calc(100% - 80px)", backgroundColor: 'transparent', borderColor: '#444653', color: '#fff'}}
          value={value} onChange={e => setValue(e.currentTarget.value)} onPressEnter={onClick}/>
          <SpeechToTextButton
            onStartRecording={onStartRecording}
            onStopRecording={onStopRecording}
            onSpeechToText={onSpeechToText}
            buttonText={"Enregistrer"}
          />
        </div>
        <Button onClick={onClick}>Envoyer</Button>
        </>
      }
      avatarSrc="User"
      position="right"
    />
  );
};
