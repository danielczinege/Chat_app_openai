import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message.component.html',
    styleUrl: './message.component.css',
})
export class MessageComponent {
    @Input() who!: 'user' | 'assistant' | 'system';
    @Input() content!: string;
}
