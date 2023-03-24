import Markdown from "markdown-to-jsx"
import { CodeBlock } from "./CodeBlock.component.js"

export const BodyMarkdown = ({children}) => {

  const options = { 
    forceBlock: true, 
    overrides: { 
      code: { 
        component: CodeBlock 
      }
    } 
  }

  return (
    <Markdown key={children} options={options}>
      {(children.match(/```/g) || []).length % 2 == 0 ? children : children + '```'}
    </Markdown>
  )
}