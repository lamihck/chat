import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setApiKey } from "../Store/OpenAI.reducer";

const QUERY_API_KEY = "apiKey";
export const ApiKey = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()
  const apiKey = useSelector(({openAI}) => openAI.apiKey)
  useEffect(() => {
    if(searchParams.get(QUERY_API_KEY)){
      dispatch(setApiKey(searchParams.get(QUERY_API_KEY)))
    }
    else if(apiKey) {
      setSearchParams({[QUERY_API_KEY]: apiKey})
    }
  }, []);

  return null
}