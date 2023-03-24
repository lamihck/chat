import { Card } from "antd"
import { useEffect, useState } from "react"
import { Arrow } from "./Arrow.component"
import { BodyMarkdown } from "./BodyMarkdown.component"
import style from './Bubble.module.css'

export const Bubble = ({direction, children}) => {
  const [text, setText] = useState("")

  useEffect(() => {
    if(typeof children == 'string'){
      setText(children)
    }
  }, [children])


  return (
    <>
      <Arrow rotate={direction !== 'left'}/>
      <Card className={style.Bubble} bodyStyle={{padding: 10}}>
        {text ? (<BodyMarkdown>{text}</BodyMarkdown>) : children}
      </Card>
    </>
  )
}