import * as Icons from '@ant-design/icons'
import { Button } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from 'react'
import style from './Input.module.css'
import { STT } from './STT.component'

export const Input = ({ onSend }) => {
  const [text, setText] = useState("")
  const onChange = (value) => {
    setText(value)
  }
  const onClick = (value) => {
    if(value.preventDefault) value.preventDefault()
    if(typeof value !== 'string') value = undefined
    onSend && onSend(value || text)
    setText("")
  }
  return (
    <div>
      <TextArea autoSize={{ minRows: 1, maxRows: 4 }} bordered={false} className={style.Input} autoFocus={true} 
        value={text} onChange={(e) => onChange(e.target.value)} onPressEnter={onClick}/>
      <Button className={style.Button} onClick={onClick}><Icons.SendOutlined style={{ fontSize: '18px' }} rotate={-45} /></Button>
      <STT onChange={onChange} onStop={onClick} />
    </div>
  )
}