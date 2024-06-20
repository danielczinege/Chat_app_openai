import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ChatSignalsService } from '../../app/chat-signals.service';
import { MessageSignalsComponent } from '../../components/message-signals/message-signals.component';
import { Message } from '@ukol-01/common';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import { SettingsService } from '../../app/settings.service';

@Component({
    selector: 'app-chat-signals',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MessageSignalsComponent],
    templateUrl: './chat-signals.component.html',
    styleUrl: './chat-signals.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatSignalsComponent {
    messageForm = new FormGroup({
        message: new FormControl('', {nonNullable: true}),
    });

    constructor(public chatService: ChatSignalsService,
                private settings: SettingsService) {}

    async handleSubmit() {
        let current_message = this.messageForm.value.message;

        if (! current_message || current_message == undefined) {
            return;
        }

        this.chatService.processing_response = true;
        this.messageForm.reset();
        this.chatService.messages.update((msgs) => [...msgs, {who: 'user', content: current_message}]);

        const ai_response = await firstValueFrom<Message>(this.chatService.getResponse({messages: this.chatService.messages(),
                                                                                        temperature: this.settings.temperature,
                                                                                        max_tokens: this.settings.max_tokens}).pipe(
            map((response) => ({who: 'assistant', content: response.message} as Message)),
            catchError((error: any, caught: Observable<any>) => of({who: 'assistant', content: "error occurred"} as Message))
        ));

        this.chatService.processing_response = false;
        this.chatService.messages.update((msgs) => [...msgs, ai_response]);
    }
}
