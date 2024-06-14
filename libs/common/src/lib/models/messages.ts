export interface MessageRequest {
    text: string;
}

export interface Message {
    who: 'user' | 'AI';
    content: string;
}
