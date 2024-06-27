import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from '../../components/conversation/conversation.component';
import { ChatSignalsService } from '../../app/chat-signals.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../app/settings.service';

@Component({
    selector: 'app-chat-list',
    standalone: true,
    imports: [CommonModule, ConversationComponent, ReactiveFormsModule],
    templateUrl: './chat-list.component.html',
    styleUrl: './chat-list.component.css',
})
export class ChatListComponent {
    createConversationForm = new FormGroup({
        conversationsTitle: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        customInstructions: new FormControl('', [Validators.maxLength(2048)]),
    });

    constructor(public chatService: ChatSignalsService,
                private settings: SettingsService) {}

    async createConversation() {
        let currentTitle = this.createConversationForm.value.conversationsTitle;
        let currentInstructions = this.createConversationForm.value.customInstructions;

        this.createConversationForm.reset();

        if (!currentTitle) {
            return;
        }

        if (currentInstructions == null) {
            currentInstructions = '';
        }

        try {
            this.chatService.createConversation(
                {title: currentTitle,
                 chatSettings: currentInstructions}
            );
            this.settings.custom_instructions = currentInstructions;
        } catch(error) {
            alert("failed to create a new conversation");
        }
    }
}
