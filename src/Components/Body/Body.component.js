import { AutoScrollFill } from "../Helper/AutoScrollFill.component.js"
import style from './Body.module.css'
import { Message } from "./Message/Message.component.js"

export const Body = ({history}) => {

  return (
    <AutoScrollFill scrollable={true} className={style.Body}>
      {history.map(({text, direction}, i) => (
        <Message key={i} direction={direction}>{text}</Message>
      ))}
    </AutoScrollFill>
  )
}