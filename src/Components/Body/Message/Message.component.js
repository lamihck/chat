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
    const smileyRegex = /^[\uD83C-\uDBFF][\uDC00-\uDFFF]/
    const smileyRegexAll = /[\uD83C-\uDBFF][\uDC00-\uDFFF]/
    if(typeof children == 'string' && smileyRegex.test(children)){
      const extracted = children.match(smileyRegex)[0]
      setText(children.substring(extracted.length))
      setAvatar(extracted)
    }
    else if(typeof children == 'string' && smileyRegexAll.test(children)){
      const extracted = children.match(smileyRegexAll)[0]
      setText(children)
      setAvatar(extracted)
    }
    else {
      setText(children)
      setAvatar(role == 'assistant' ? '🤖' : '😃')
    }
  }, [children])

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