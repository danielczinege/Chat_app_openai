import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, Message, MessageRequest } from '@ukol-01/common';
import { Observable, Subject, catchError, map, of, scan, shareReplay, startWith, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    processing_response = false;
    message = new Subject<string>();
    messages$: Observable<Message[]> = this.message.asObservable().pipe(
        switchMap((current_message: string) => {
            return this.getResponse({text: current_message}).pipe(
                map((response) => {
                    this.processing_response = false;
                    return ({who: 'AI', content: response.message} as Message)
                }),
                catchError((error: any, caught: Observable<any>) => {
                    this.processing_response = false;
                    return of({who: 'AI', content: "error occurred"} as Message)
                }),
                startWith({who: 'user', content: current_message} as Message));
        }),
        scan((acumulator, message) => [...acumulator, message], [] as Message[]),
        shareReplay(1)
    );

    constructor(private http: HttpClient) {}

    getResponse(message: MessageRequest) {
        return this.http.post<IResponse>("http://localhost:3000/api/chat", message);
    }
}
