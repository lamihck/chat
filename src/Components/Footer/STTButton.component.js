import { AudioOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useLongPress } from "use-long-press";
import style from './STTButton.module.css';

export const STTButton = ({ className, onListeningChange }) => {
  const [isListening, setListening] = useState(false)

  useEffect(() => {
    onListeningChange && onListeningChange(isListening)
  }, [isListening])

  const handleMouseDown = () => {
    setListening(true)
  }

  const handleMouseUp = () => {
    setListening(false)
  }

  const handleClick = () => {
    setListening((prevState) => !prevState)
  }

  const bind = useLongPress(() => handleMouseDown(), {
    onFinish: () => handleMouseUp(),
    onCancel: () => handleClick(),
    threshold: 200,
    captureEvent: true
  })()

  return (
    <Button
      className={style.Button}
      {...bind}
      shape={'circle'}
      size={'large'}
    >
      <AudioOutlined style={{ color: isListening ? '#F33' : 'unset' }} />
    </Button>
  )
}