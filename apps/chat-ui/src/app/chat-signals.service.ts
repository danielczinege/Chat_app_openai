import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { Conversation, IResponse, Message, MessageRequest } from '@ukol-01/common';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatSignalsService implements OnInit {
    processing_response = false;
    messages = signal<Message[]>([]);
    conversationID: number | null = null;
    conversations: Conversation[] = [];
    failed_to_load_conversations = false;

    constructor(private http: HttpClient) {}

    async ngOnInit(): Promise<void> {
        this.conversations = await firstValueFrom<Conversation[]>(
            this.http.get<Conversation[]>("http://localhost:3000/api/chat/conversations")
            .pipe(catchError((error: any, caught: Observable<any>) => {
                this.failed_to_load_conversations = true;
                return of([] as Conversation[]);
            }))
        );
    }

    getResponse(message: MessageRequest) {
        return this.http.post<IResponse>("http://localhost:3000/api/chat", message);
    }
}
