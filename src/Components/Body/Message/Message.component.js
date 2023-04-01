import { Layout } from "antd"
import { useEffect, useState } from "react"
import { Avatar } from "./Avatar.component.js"
import { Bubble } from "./Bubble.component.js"
import style from './Message.module.css'
const { Content, Sider } = Layout

export const Message = ({ role, children }) => {

  const [text, setText] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    const smileys = children.match(/^(.*?)([\uD800-\uDBFF][\uDC00-\uDFFF])(.*)$/);
    setText(smileys ? smileys[1] + smileys[3] : children);
    setAvatar(smileys ? smileys[2] : (role === 'assistant' ? '🤖' : '😃'));
  }, [children, role])


  return (
    <Layout className={style.Layout}>
      <Sider width={64} className={style.Sider}>
        {role == 'assistant' && <Avatar>{avatar}</Avatar>}
      </Sider>
      <Content>
        <Bubble direction={role == 'assistant' ? 'left' : 'right'}>{text}</Bubble>
      </Content>
      <Sider width={64} className={style.Sider}>
        {role != 'assistant' && <Avatar>{avatar}</Avatar>}
      </Sider>
    </Layout>
  )
}