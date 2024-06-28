import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSignalsService } from '../../app/chat-signals.service';
import { SettingsService } from '../../app/settings.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Message } from '@ukol-01/common';
import { ConfigService } from '../../app/config.service';

@Component({
    selector: 'app-conversation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './conversation.component.html',
    styleUrl: './conversation.component.css',
})
export class ConversationComponent {
    @Input() id!: number;
    @Input() title!: string;

    constructor(public chatService: ChatSignalsService,
                private settings: SettingsService,
                private http: HttpClient,
                private configService: ConfigService) {}

    async setConversation() {
        if (this.id === this.chatService.conversationID) {
            return;
        }

        this.chatService.processing_response = true;

        try {
            let loadedMessages = await firstValueFrom<Message[]>(
                this.http.get<Message[]>(`${this.configService.config['api_host']}/api/chat/conversations/${this.id}`)
            );
            this.chatService.messages.set(loadedMessages);
            this.chatService.conversationID = this.id;

            if (loadedMessages.length != 0 && loadedMessages[0].sender == 'system') {
                this.settings.custom_instructions = loadedMessages[0].content;
            } else {
                this.settings.custom_instructions = "";
            }

            this.chatService.processing_response = false;
        } catch (error) {
            this.chatService.processing_response = false;
            alert("failed to load conversation");
        }
    }

    async deleteConversation() {
        this.chatService.processing_response = true;
        try {
            await firstValueFrom<void>(
                this.http.delete<void>(`${this.configService.config['api_host']}/api/chat/conversations/${this.id}`)
            );

            if (this.chatService.conversationID === this.id) {
                this.chatService.conversationID = null;
                this.chatService.messages.set([]);
                this.settings.custom_instructions = '';
            }

            this.chatService.conversations.update((msgs) => msgs.filter( elem => elem.id != this.id));
            this.chatService.processing_response = false;
        } catch (error) {
            this.chatService.processing_response = false;
            alert("failed to delete the conversation");
        }
    }
}
