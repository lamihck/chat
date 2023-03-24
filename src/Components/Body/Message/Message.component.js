import { Layout } from "antd"
import { useEffect, useState } from "react"
import { Avatar } from "./Avatar.component.js"
import { Bubble } from "./Bubble.component.js"
import style from './Message.module.css'
const { Content, Sider } = Layout

export const Message = ({ direction, children }) => {

  const [text, setText] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    const smileyRegex = /^[\uD83C-\uDBFF][\uDC00-\uDFFF]/
    if(typeof children == 'string' && smileyRegex.test(children)){
      const extracted = children.match(smileyRegex)[0]
      setText(children.substring(extracted.length))
      setAvatar(extracted)
    }
    else {
      setText(children)
      setAvatar(direction == 'right' ? 'User' : 'IA')
    }
  }, [children])

  return (
    <Layout className={style.Layout}>
      <Sider width={64} className={style.Sider}>
        {direction == 'left' && <Avatar>{avatar}</Avatar>}
      </Sider>
      <Content>
        <Bubble direction={direction}>{text}</Bubble>
      </Content>
      <Sider width={64} className={style.Sider}>
        {direction != 'left' && <Avatar>{avatar}</Avatar>}
      </Sider>
    </Layout>
  )
}