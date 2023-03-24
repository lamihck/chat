import { Avatar as AntAvatar } from "antd"

export const Avatar = (props) => {

  return (
    <AntAvatar size={40}>{props.children}</AntAvatar>
  )
}