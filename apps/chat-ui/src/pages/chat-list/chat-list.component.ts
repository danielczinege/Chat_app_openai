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
        conversationsTitle: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        customInstructions: new FormControl(null, [Validators.maxLength(2048)]),
    });

    sfjsdlfj = "Philosophical debate";
    flksjflksdjfklajsdflkjsd = 56;

    nother = "Another debate";
    smother = 4;

    constructor(public chatService: ChatSignalsService,
                private settings: SettingsService) {}

    handleSubmit() {

    }
}
