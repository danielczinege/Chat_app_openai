import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, Message, MessageRequest } from '@ukol-01/common';
import { Observable, Subject, catchError, map, of, scan, shareReplay, startWith, switchMap } from 'rxjs';
import { SettingsService } from './settings.service';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    processing_response = false;
    conversationID = 2;
    message = new Subject<string>();
    messages$: Observable<Message[]> = this.message.asObservable().pipe(
        switchMap((current_message: string) => {
            return this.getResponse({messages: [{sender: 'user', content: current_message} as Message],
                                     temperature: this.settings.temperature,
                                     max_tokens: this.settings.max_tokens,
                                     conversationID: this.conversationID},
            ).pipe(
                map((response) => {
                    this.processing_response = false;
                    return ({sender: 'assistant', content: response.message} as Message)
                }),
                catchError((error: any, caught: Observable<any>) => {
                    this.processing_response = false;
                    return of({sender: 'assistant', content: "error occurred"} as Message)
                }),
                startWith({sender: 'user', content: current_message} as Message));
        }),
        scan((acumulator, message) => [...acumulator, message], [] as Message[]),
        shareReplay(1)
    );

    constructor(private http: HttpClient,
                private settings: SettingsService,
                private configService: ConfigService) {}

    getResponse(message: MessageRequest) {
        return this.http.post<IResponse>(`${this.configService.config['api_host']}/api/chat`, message);
    }
}
