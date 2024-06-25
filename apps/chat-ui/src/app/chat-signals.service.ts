import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IResponse, Message, MessageRequest } from '@ukol-01/common';

@Injectable({
    providedIn: 'root'
})
export class ChatSignalsService {
    processing_response = false;
    messages = signal<Message[]>([]);
    conversationID: number | null = 4;

    constructor(private http: HttpClient) {}

    getResponse(message: MessageRequest) {
        return this.http.post<IResponse>("http://localhost:3000/api/chat", message);
    }
}
