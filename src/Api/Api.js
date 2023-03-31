
const fakeCreateChatCompletition = async (apiKey, model, prompt, query, history, cb) => {
  
  let parts = Array.from({length: 200}, (_v, i) => `${i%5==0 ? '`' : ''}${Math.random().toString(36).substring(2, 6)}${i%5==0 ? '`' : ''}${Math.random() > 0.2 ? ' ' : '\n\r'}`)
  let acc = ''
  for await(let part of parts){
    acc += part
    cb(acc)
    await new Promise(resolve => setTimeout(resolve, 50))
  }
  return acc
}


export const createChatCompletion = async (apiKey, model, prompt, query, history, cb) => {

  if(!cb) return fakeCreateChatCompletition(apiKey, model, prompt, query, history, cb)

  let messages = [
    {
      role: "system",
      content: prompt,
    },
    ...(history ? history.map(({ role, content }) => ({ role: role == 'user' ? role : 'assistant', content })) : [])
  ]

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
          delta['finish_reason'] = data.choices[0]['finish_reason'] ?? ''
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
