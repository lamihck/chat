
import { CopyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from "react";
import style from './CodeBlock.module.css';
import "./prism-vsc-dark-plus.css";

export const CodeBlock = ({ children, ...props }) => {
  const ref = useRef(null);
  const onCopy = () => {
    if (ref.current) {
      const code = ref.current.innerText;
      navigator.clipboard.writeText(code)
    }
  }
  return (
    <div className={style.BlockContainer} >
      <div className={style.BlockHeader}>
        <span className={style.BlockSpan}>{props.className && props.className.replace('language-', '')}</span>
        <Button className={style.CopyButton} type={'text'} onClick={onCopy}>
          <CopyOutlined />Copy
        </Button>
      </div>

      <pre className={`${style.BlockPre} ${props.className}`} ref={ref}>
        {children}
      </pre>
    </div>
  );
}