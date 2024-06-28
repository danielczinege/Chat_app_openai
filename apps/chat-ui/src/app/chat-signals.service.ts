import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { Conversation, ConversationInsertRequest, IResponse, Message, MessageRequest } from '@ukol-01/common';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class ChatSignalsService {
    processing_response = false;
    messages = signal<Message[]>([]);
    conversationID: number | null = null;
    conversations = signal<Conversation[]>([]);
    failed_to_load_conversations = false;

    constructor(private http: HttpClient,
                private configService: ConfigService
    ) {
        this.init();
    }

    async init(): Promise<void> {
        const loadedConversations = await firstValueFrom<Conversation[]>(
            this.http.get<Conversation[]>(`${this.configService.config['api_host']}/api/chat/conversations`)
            .pipe(catchError((error: any, caught: Observable<any>) => {
                this.failed_to_load_conversations = true;
                return of([] as Conversation[]);
            }))
        );

        this.conversations.set(loadedConversations);
    }

    getResponse(message: MessageRequest) {
        return this.http.post<IResponse>(`${this.configService.config['api_host']}/api/chat`, message);
    }

    async createConversation(conversation: ConversationInsertRequest) {
        let id = await firstValueFrom(this.http.post<number>(`${this.configService.config['api_host']}/api/chat/conversation`, conversation));
        this.conversationID = id;

        this.conversations.update(conversations => [
            ...conversations,
            {id: id,
             title: conversation.title}
        ]);

        if (conversation.chatSettings) {
            this.messages.set([{sender: 'system',
                                content: conversation.chatSettings}]);
        } else {
            this.messages.set([]);
        }
    }
}
