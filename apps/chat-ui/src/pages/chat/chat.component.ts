import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Message } from '@ukol-01/common';
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

    messages: Message[] = [];

    handleSubmit() {
        let current_message = this.messageForm.value.message;

        if (! current_message || current_message == undefined) {
            return;
        }

        this.messages.push({who: "user", content: current_message});
        this.messageForm.reset();
        this.messages.push({who: "AI", content: "Hmm... That is interesting. Here is some random large text: dddd ddddddddddd dddddddddd dddddddddd dddddd ddddddd ddddddd dddddddd ddddddddd dddddddddddddd dddddddddddddddd dddddddddd ddddddddddddddd dddddddddd dddddddddd dddddddd dddddddddddd ddddddddddddddddd ddddddddddddddd ddddddddddddddd dddddddddddddddddddddd"})
    }
}
