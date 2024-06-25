import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSignalsService } from '../../app/chat-signals.service';

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

    constructor(public chatService: ChatSignalsService) {}
}
