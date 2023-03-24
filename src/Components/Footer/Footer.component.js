import { Message } from "../Body/Message/Message.component.js";
import { Input } from "./Input.component.js";

export const Footer = ({onSend}) => {

  return (
    <Message direction={'right'}>
      <Input onSend={onSend}/>
    </Message>
  )
}