import { Input } from "antd"
import { useSelector } from "react-redux"
import _ from 'lodash';

export const PromptSelector = ({}) => {
  
  const token = useSelector(({openAI}) => openAI.token)
  return (
    <Input style={{backgroundColor: 'transparent', color: 'inherit', width: 'auto'}} value={`${token} (${_.round((token/1000.0)*0.002, 4)}$)`}/>
  )
}