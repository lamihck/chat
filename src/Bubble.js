import { Avatar, Card } from "antd";
import "highlight.js/styles/vs2015.css";
import _ from 'lodash';
import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { CodeBlock } from "./CodeBlock";

export const Bubble = ({ text, avatarSrc, position, isMute }) => {
  const [textParts, setTextParts] = useState([])
  const [alreadySayed, setAlreadySayed] = useState([])
  const [withVoice, setWithVoice] = useState(true)
  const { speak, cancel } = useSpeechSynthesis();
  const [avatar, setAvatar] = useState()

  useEffect(() => {
    let regex = /((.*?)(,|\.|\?|\!|\[DONE\]))/gm;
    if(text && typeof text == 'string'){
      let parts = text.match(regex)
      if(JSON.stringify(textParts) != JSON.stringify(parts)){
        setTextParts(parts)
      }
    }

    if(text && typeof text == 'string'){
      const regex = /^[\uD83C-\uDBFF\uDC00-\uDFFF]+/gm
      const match = text.match(regex)
      console.info(match)
      if(match && match[0]){
        setAvatar(match[0])
      }
    }
  }, [text])


  useEffect(() => {
    if(withVoice && !isMute){
      speak({ text: _.xor(alreadySayed, textParts) });
      setAlreadySayed(textParts)
    }
  }, [textParts])

  useEffect(() => {
    if(isMute) cancel()
  }, [isMute])

  const isRightPosition = position === "right";
  const avatarStyle = {
    top: `${53/2 - 32/2}px`,
    float: isRightPosition ? "right" : "left",
    [isRightPosition ? "marginLeft" : "marginRight"]: 18,
  };
  const smileyAvatarStyle = {
    ...avatarStyle,
    transform: 'scale(2)'
  }
  const textStyle = {
    textAlign: isRightPosition ? "right" : "left",
    margin: 0,
    color: '#D1D5DB'
  };
  const bubbleTriangleStyle = {
    position: "absolute",
    top: `${(65/2) - 16/2}px`,
    [isRightPosition ? "right" : "left"]: 46,
    borderColor: 'transparent transparent #343540 transparent',
    borderWidth: "8px 8px 8px 8px",
    borderStyle: "solid",
    zIndex: 1,
    transform: isRightPosition ? "rotate(90deg)" : "rotate(-90deg)"
  };
  const bubbleTriangleShadowStyle = {
    position: "absolute",
    top: `${(65/2) - 16/2}px`,
    [isRightPosition ? "right" : "left"]: 45,
    borderColor: 'transparent transparent #00000040 transparent',
    borderWidth: "8px 8px 8px 8px",
    borderStyle: "solid",
    zIndex: 1,
    transform: isRightPosition ? "rotate(90deg)" : "rotate(-90deg)"
  };

  const cardStyle = { 
    textAlign: isRightPosition ? "right" : "left", 
    width: 'calc(100% - 50px)', 
    display: 'inline-block',
    backgroundColor: '#343540' };

  const getText = () => {
    if(avatar) return text.substring(2)
    return text
  }

  return (
    <div
      style={{
        position: "relative",
        display: 'block',
        alignContent: 'end',
        padding: 12,
        paddingBottom: 6,
        paddingTop: 6
      }}
    >
      {!isRightPosition && <Avatar style={avatar ? smileyAvatarStyle : avatarStyle} >{avatar || avatarSrc}</Avatar>}
      {!isRightPosition && <div style={bubbleTriangleShadowStyle} />}
      {!isRightPosition && <div style={bubbleTriangleStyle} />}
      <Card
        style={cardStyle}
        bodyStyle={{padding: '0 16px'}}
        bordered={false}
        onClick={() => setWithVoice(!withVoice)}
      >
        <div style={{...textStyle, fontSize: '16px'}}>
          {typeof(text) == 'string' && <Markdown key={text} options={{ forceBlock: true, overrides: { code: { component: CodeBlock }} }}>{(text.match(/```/g) || []).length % 2 == 0 ? getText() : getText() + '```'}</Markdown>}
          {typeof(text) == 'object' && (<div>{text}</div>)}
        </div>
      </Card>
      {isRightPosition && <div style={bubbleTriangleShadowStyle} />}
      {isRightPosition && <div style={bubbleTriangleStyle} />}
      {isRightPosition && <Avatar style={avatar ? smileyAvatarStyle : avatarStyle}>{avatar || avatarSrc}</Avatar>}
    </div>
  );
};
