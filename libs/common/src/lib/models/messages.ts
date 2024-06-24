export interface MessageRequest {
    messages: Message[];
    temperature: number;
    max_tokens: number;
}

export interface Message {
    sender: 'user' | 'assistant' | 'system';
    content: string;
}
