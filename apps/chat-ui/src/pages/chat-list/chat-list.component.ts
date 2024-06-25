import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from '../../components/conversation/conversation.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, ConversationComponent],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent {
  sfjsdlfj = "Philosophical debate";
  flksjflksdjfklajsdflkjsd = 56;

  nother = "Another debate";
  smother = 4;
}
