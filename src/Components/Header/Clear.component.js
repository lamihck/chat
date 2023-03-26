import { Button } from "antd";
import { useCookies } from "react-cookie";

export const Clear = ({}) => {
  const [cookies, setCookie, removeCookie] = useCookies()

  const onClick = () => {
    removeCookie('history')
    window.location.reload()
  }
 
  return (
    <Button onClick={onClick}>Refresh</Button>
  )
}