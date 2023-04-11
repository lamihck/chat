import { AutoScrollFill } from "../Helper/AutoScrollFill.component.js"
import style from './Body.module.css'
import { Message } from "./Message/Message.component.js"

export const Body = ({history}) => {

  return (
    <AutoScrollFill scrollable={true} className={style.Body}>
      {history.filter(({role}) => role !== 'system').map(({content, role}, i) => (
        <Message key={i} role={role}>{content}</Message>
      ))}
    </AutoScrollFill>
  )
}