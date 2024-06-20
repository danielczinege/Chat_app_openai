import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-message-signals',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-signals.component.html',
    styleUrl: './message-signals.component.css',
})
export class MessageSignalsComponent {
    @Input() who!: 'user' | 'assistant' | 'system';
    @Input() content!: string;
}
