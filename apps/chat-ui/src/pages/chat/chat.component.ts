import { ChatService } from './../../app/chat.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MessageComponent } from '../../components/message/message.component';

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

    constructor(public chatService: ChatService) {}

    handleSubmit() {
        let current_message = this.messageForm.value.message;

        if (! current_message || current_message == undefined) {
            return;
        }

        this.chatService.processing_response = true;
        this.messageForm.reset();
        this.chatService.message.next(current_message);
    }
}
