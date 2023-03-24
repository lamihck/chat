import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { STTButton } from "./STTButton.component";

export const STT = ({ onChange, onStop }) => {
  const [isListening, setListening] = useState(false)
  const { transcript, finalTranscript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true })
    }
    else {
      SpeechRecognition.stopListening()
    }
  }, [isListening])

  useEffect(() => {
    onChange && transcript && onChange(transcript)
  }, [transcript])

  useEffect(() => {
    if (!isListening && !listening && finalTranscript) {
      onStop && onStop(finalTranscript)
      resetTranscript()
    }
  }, [finalTranscript, isListening, listening])

  return (
    <STTButton onListeningChange={setListening} />
  )
}