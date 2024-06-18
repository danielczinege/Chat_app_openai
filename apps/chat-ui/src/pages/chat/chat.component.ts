import { IResponse } from './../../../../../libs/common/src/lib/common';
import { ChatService } from './../../app/chat.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Message } from '@ukol-01/common';
import { MessageComponent } from '../../components/message/message.component';
import { Observable, Subject, Subscription, catchError, map, of, scan, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MessageComponent],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
})
export class ChatComponent {
    messageForm = new FormGroup({
        message: new FormControl('', {nonNullable: true}),
    });
    processing_response = false;
    message = new Subject<string>();
    messages$: Observable<Message[]> = this.message.asObservable().pipe(
        switchMap((current_message: string) => {
            return this.chatService.getResponse({text: current_message}).pipe(
                map((response) => {
                    return [{who: 'user', content: current_message},
                            {who: 'AI', content: response.message}] as Message[]
                }),
                catchError((error: any, caught: Observable<any>) => {
                return of([{who: 'user', content: current_message},
                           {who: 'AI', content: "error occured"}] as Message[]);
            }));
        }), scan((acumulator, messages, index) => [...acumulator, ...messages], [] as Message[]),
         tap(() => {
            this.processing_response = false;
        })
    );

    constructor(private chatService: ChatService) {}

    handleSubmit() {
        let current_message = this.messageForm.value.message;

        if (! current_message || current_message == undefined) {
            return;
        }

        this.processing_response = true;
        this.messageForm.reset();
        this.message.next(current_message);
    }
}
