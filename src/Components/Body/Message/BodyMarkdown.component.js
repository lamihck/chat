
import "katex/dist/katex.min.css";
import ReactMarkdown from "react-markdown";
import RehypeKatex from "rehype-katex";
import RehypePrism from "rehype-prism-plus";
import RemarkGfm from "remark-gfm";
import RemarkMath from "remark-math";
import { CodeBlock } from "./CodeBlock.component";
import './MarkdownTable.css';

export const BodyMarkdown = ({ children }) => {
  return (
    <ReactMarkdown
      key={children}
      remarkPlugins={[RemarkMath, RemarkGfm]}
      rehypePlugins={[RehypeKatex, [RehypePrism, { ignoreMissing: true }]]}
      components={{pre: CodeBlock}}
    >
      {children}
    </ReactMarkdown>
  )
}