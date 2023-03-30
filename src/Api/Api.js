import { encode } from '@nem035/gpt-3-encoder';

export const getToken = (prompt, history) => {
  let tokens = history.map(({content}) => content).map(encode).map(t => t.length)
  console.info(tokens)
}

export const createChatCompletion = async (apiKey, model, prompt, query, history, cb) => {
  let messages = [
    {
      role: "system",
      content: prompt,
    },
    ...(history ? history.map(({ role, content }) => ({ role: role == 'user' ? role : 'assistant', content })) : [])
  ]

  getToken(prompt, messages)

  var es = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    method: "POST",
    body: JSON.stringify({
      model: model,
      stream: true,
      messages: [
        ...messages,
        { role: "user", content: query },
      ],
      frequency_penalty: 0
    }),
  });

  const reader = es.body?.pipeThrough(new TextDecoderStream()).getReader();
  let responseObj = {};
  for (; ;) {
    const { done, value } = await reader.read();
    if (done) break;
    const lines = value.split("\n").filter(Boolean);
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        if (line.includes("[DONE]")) return responseObj;
        try {
          const data = JSON.parse(line.slice(6));
          const delta = data.choices[0].delta;
          if(data.choices[0]['finish_reason'] == 'length'){
            createChatCompletion(apiKey, model, null, 'continue', 
              [
                ...history, 
                { role: 'user', content: query}, 
                { role: 'assistant', content: responseObj.content}
              ], (r) => cb(`${responseObj.content} ${r}`))
          }
          for (const key in delta) {
            if (!(key in responseObj)) responseObj[key] = delta[key];
            else responseObj[key] += delta[key];
            //console.info(responseObj)
            if (responseObj.content) cb(responseObj.content);
          }
        } catch (e) {
          console.log("Error parsing line:", line);
        }
      }
    }
  }
  return responseObj;
  
};
