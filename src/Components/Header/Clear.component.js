import { Button } from "antd";
import { useDispatch } from "react-redux";
import { clearHistory } from "../../Store/History.reducer";
import { resetModel, resetPrompt } from "../../Store/OpenAI.reducer";

export const Clear = ({}) => {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(clearHistory())
    dispatch(resetPrompt())
    dispatch(resetModel())
  }
 
  return (
    <Button style={{backgroundColor: 'transparent', color: 'inherit'}} onClick={onClick}>Refresh</Button>
  )
}