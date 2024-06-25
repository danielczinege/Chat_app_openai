export interface MessageRequest {
    messages: Message[];
    temperature: number;
    max_tokens: number;
    conversationID: number;
}

export interface Message {
    sender: 'user' | 'assistant' | 'system';
    content: string;
}
