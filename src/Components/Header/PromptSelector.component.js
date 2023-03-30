import { Input } from "antd"
import { useSelector } from "react-redux"


export const PromptSelector = ({}) => {
  
  const token = useSelector(({openAI}) => openAI.token)
  return (
    <Input style={{backgroundColor: 'transparent', color: 'inherit', width: 'auto'}} value={`${token} (${(token/1000.0)*0.002}$)`}/>
  )
}