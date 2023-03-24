import { AudioOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

export const SpeechToTextButton = ({
  onStartRecording,
  onSpeechToText,
  onStopRecording
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const { transcript, finalTranscript, resetTranscript, listening } = useSpeechRecognition({clearTranscriptOnListen: true, transcribing: true});

  useEffect(() => {
    if (transcript && isRecording) {
      onSpeechToText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if(!isRecording && finalTranscript){
      onStopRecording(finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript, isRecording])

  const handleMouseDown = () => {
    setIsRecording(true);
    onStartRecording();
    SpeechRecognition.startListening({
      continuous: false,
      interimResults: false
    });
  };

  const handleMouseUp = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
    
  };

  return (
    <Button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={listening ? {width: '200px'} : {}}
      shape={listening ? "round" : "circle"}
      size="large"
    >
      <AudioOutlined color={listening ? '#000' : '#AAA'}/>
    </Button>
  );
};
