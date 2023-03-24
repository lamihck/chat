import React from "react";
import { Button } from "antd";
import { SoundOutlined } from "@ant-design/icons";
import { useSpeechSynthesis } from "react-speech-kit";

export const SpeakerButton = ({ textToSpeak, style }) => {
  const { speak } = useSpeechSynthesis();

  const handleSpeak = () => {
    speak({ text: textToSpeak });
  };

  return (
    <Button onClick={handleSpeak} shape="circle" size="small" style={style}>
      <SoundOutlined />
    </Button>
  );
};
