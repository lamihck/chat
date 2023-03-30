import { Button } from "antd";
import { useDispatch } from "react-redux";
import { clearHistory } from "../../Store/History.reducer";

export const Clear = ({}) => {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(clearHistory())
  }
 
  return (
    <Button style={{backgroundColor: 'transparent', color: 'inherit'}} onClick={onClick}>Refresh</Button>
  )
}