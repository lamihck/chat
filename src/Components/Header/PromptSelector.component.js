import { Input } from "antd";
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const PromptSelector = ({}) => {
  
  const history = useSelector(({history}) => history.history)
  const [token, setToken] = useState(0)

  useEffect(() => {
    if(history.length > 0) setToken(history.map(({token}) => token).reduce((p,c) => p+c, 0))
  }, [history])
  
  return (
    <Input style={{backgroundColor: 'transparent', color: 'inherit', width: 'auto'}} value={`${token} (${_.round((token/1000.0)*0.002, 4)}$)`}/>
  )
}