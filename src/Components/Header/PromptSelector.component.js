import { Select } from "antd"
import _ from 'lodash'
import { useEffect, useState } from "react"


export const PromptSelector = ({}) => {
  const [prompts, setPrompts] = useState([])
  const [prompt, setSelectedPrompt] = useState('')

  useEffect(() => {
    try{
    fetch('https://proxy.cors.sh/https://www.jailbreakchat.com/api/getprompts', {method: 'GET'})
      .then(r => r.json())
      .then(r => _.sortBy(r, r => -(r.upvotes - r.downvotes)))
      .then(setPrompts)
      .catch(() => {})
    } catch(_e){}
  }, [])

  const onChange = (v) => {
    console.info(v)
  }

  return (
    <Select style={{ width: '200px'}} onChange={onChange}>
      {prompts.map((prompt) => (
        <Select.Option key={prompt.id} value={prompt.text}>{prompt.name} ({prompt.upvotes - prompt.downvotes})</Select.Option>
      ))}
      
    </Select>
  )
}