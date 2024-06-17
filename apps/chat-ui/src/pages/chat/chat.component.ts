import { IResponse } from './../../../../../libs/common/src/lib/common';
import { ChatService } from './../../app/chat.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Message } from '@ukol-01/common';
import { MessageComponent } from '../../components/message/message.component';
import { Observable, Subscription, catchError, of } from 'rxjs';

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
    messages: Message[] = [];
    processing_response = false;
    private subscription: Subscription | null = null;

    constructor(private chatService: ChatService) {}

    async handleSubmit() {
        let current_message = this.messageForm.value.message;

        if (! current_message || current_message == undefined) {
            return;
        }

        this.processing_response = true;
        this.messageForm.reset();

        this.messages.push({who: "user", content: current_message});

        this.subscription = this.chatService.getResponse({text: current_message}).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
            this.messages.push({who: "AI", content: "error occured"});
            this.processing_response = false;
            return of();
        }))
        .subscribe({next: (response: IResponse) => {
            this.messages.push({who: "AI", content: response.message});
            this.processing_response = false;
        }, complete: () => {
            if (this.subscription) {
                this.subscription.unsubscribe();
                this.subscription = null;
            }
        }});
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
