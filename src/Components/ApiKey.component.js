import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useChatCompletion } from "../Api/useChatCompletion";
import { setApiKey } from "../Store/OpenAI.reducer";

const QUERY_API_KEY = "apiKey";
export const ApiKey = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()
  const apiKey = useSelector(({openAI}) => openAI.apiKey)
  const model = useSelector(({openAI}) => openAI.model)
  const [messages, submitQuery] = useChatCompletion({apiKey, model})
  useEffect(() => {
    if(searchParams.get(QUERY_API_KEY)){
      dispatch(setApiKey(searchParams.get(QUERY_API_KEY)))
    }
    else if(apiKey) {
      setSearchParams({[QUERY_API_KEY]: apiKey})
    }

    //submitQuery([...messages, {content: 'Tu ne peux répondre qu\'un seul mot.', role: 'system'}])
    //setTimeout(() => submitQuery([...messages, {content: 'Salut', role: 'user'}]), 1000)
    //setTimeout(() => submitQuery([...messages, {content: 'ça va ?', role: 'user'}]), 2000)
    
    //submitQuery([{content: 'Bonjour, Quel est ton nom ?', role: 'user'}])
  }, []);

  useEffect(() => {
    console.info(messages)
  }, messages)

  return null
}