import GPT3Tokenizer from 'gpt3-tokenizer';
import { useCallback, useState } from 'react';
import { SSE } from 'sse.js';

const CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
const officialOpenAIParams = ({ content, role }) => ({ content, role });

const createChatMessage = ({ content, role, ...restOfParams }) => ({
    content,
    role,
    timestamp: restOfParams.timestamp || Date.now(),
    loading: false,
    responseTime: '',
    token: content ? tokenizer.encode(content).bpe.length : 0,
    ...restOfParams
});

const setMessageListener = (source, setMessages, updatedMessages) => {
    source.addEventListener('message', (e) => {
        if (e?.data !== '[DONE]') {
            const payload = JSON.parse(e?.data || '{}');
            const chunk = payload?.choices?.[0]?.delta;
            const finishReason = payload?.choices?.[0]?.finish_reason;
            setMessages((msgs) => msgs.map((message, i) => {
                if (updatedMessages.length - 1 === i) {
                    return {
                        content: message.content + (chunk?.content || ''),
                        role: message.role + (chunk?.role || ''),
                        timestamp: Date.now(),
                        token: message.token + (chunk?.content ? 1 : 0),
                        finishReason
                    };
                }
                return message;
            }));
        }
        else {
            source.close();
        }
    });
};

const setReadyStateChangeListener = (source, setMessages, updatedMessages) => {
    const beforeTimestamp = Date.now();
    source.addEventListener('readystatechange', (e) => {
        if (e.readyState && e.readyState > 1) {
            const afterTimestamp = Date.now();
            const diffInSeconds = afterTimestamp - beforeTimestamp;
            setMessages((msgs) => msgs.map((message, i) => {
                if (updatedMessages.length - 1 === i) {
                    return {
                        ...message,
                        timestamp: afterTimestamp,
                        loading: false,
                        responseTime: diffInSeconds
                    };
                }
                return message;
            }));
        }
    });
};

/**
 * Takes an object containing two properties: "model" and "apiKey". Use the returned
 * object to access the list of messages and the `submitQuery` function for sending
 * queries to the chat model.
 *
 * @param {Object} options - The options object to use.
 * @param {string} options.apiKey - The API key needed to make requests.
 * @param {'text-davinci-003'|'gpt-3.5-turbo'|'gpt-4'} options.model - The chat model to use.
 * @returns {[{content: string, role: 'user'|'assistant'|'system', timestamp: number, loading: boolean, responseTime, token: number}[], function({content: string, role: 'user'|'assistant'|'system'}[]): void]} - The list of messages and the `submitQuery` function.
 */
export const useChatCompletion = ({ model, apiKey }) => {
    const [messages, setMessages] = useState([]);

    const submitQuery = useCallback((newMessages) => {
        if(typeof newMessages === 'object' && !Array.isArray(newMessages)) newMessages = [newMessages]

        if (!newMessages || newMessages.length < 1) return setMessages([]);
        if (messages[messages.length - 1]?.loading) return;
        
        const updatedMessages = [
            ...newMessages.filter(({role}) => role == 'system').map(createChatMessage),
            ...messages.filter(({role}) => role !== 'system' || newMessages.filter(({role}) => role == 'system').length == 0),
            ...newMessages.filter(({role}) => role !== 'system').map(createChatMessage),
        ];

        setMessages(updatedMessages);

        const source = new SSE(CHAT_COMPLETIONS_URL, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            method: 'POST',
            payload: JSON.stringify({
                model,
                messages: updatedMessages
                    .map(officialOpenAIParams),
                stream: true,
            }),
        });

        if(updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].role == 'user'){
            updatedMessages.push(createChatMessage({ content: '', role: '', loading: true }))
            setMessages(updatedMessages);
            setMessageListener(source, setMessages, updatedMessages);
            setReadyStateChangeListener(source, setMessages, updatedMessages);
            source.stream();
        }
        
    }, [messages, setMessages]);
    return [messages, submitQuery];
};


