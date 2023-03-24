import { CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import hljs from 'highlight.js';
import "highlight.js/styles/base16/eighties.css";
import React, { useEffect, useRef } from 'react';

export const CodeBlock = ({language, children, className}) => {
  const ref = useRef(null)

  useEffect(() => {
    if(ref.current){
      hljs.highlightBlock(ref.current)
    }
  }, [])

  const titleStyle = {
    width: '100%',
    backgroundColor: '#494a56bf',
    borderRadius: '5px 5px 0 0',
    padding: '5px 12px',
    fontSize: 'small',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const codeStyle = {
    borderRadius: '0 0 5px 5px',
    fontSize: '14px'
  }

  const onCopy = () => {
    navigator.clipboard.writeText(children)
  }

  return (
    <>
    {className && <div style={titleStyle}>
      <span>{className && className.replace('lang-','')}</span>
      <Button style={{color: '#d1d5db', padding: 0, height: '26px', fontSize: '12px'}} type={'text'} onClick={onCopy}><CopyOutlined /> Copy</Button>
    </div>}
    <code style={codeStyle} className={`hljs ${className && `language-${className.replace('lang-','')}`}`} ref={ref}>
      {children}
    </code>
    </>
  )
}