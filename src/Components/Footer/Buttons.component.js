import * as Icons from '@ant-design/icons'
import { Button } from "antd"
import style from './Buttons.module.css'

export const Buttons = ({}) => {


  return (
    <>
      <Button className={style.Button}><Icons.SendOutlined style={{fontSize: '18px'}} rotate={-45}/></Button>
    </>
  )
}