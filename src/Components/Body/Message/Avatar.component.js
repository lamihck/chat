import { Avatar as AntAvatar } from "antd"

export const Avatar = (props) => {

  return (
    <AntAvatar size={40} style={{fontSize: 25}} >{props.children}</AntAvatar>
  )
}