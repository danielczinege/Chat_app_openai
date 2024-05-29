import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { exampleFunction } from '@ukol-01/common';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { ChatService } from './chat.service';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'chat-ui';

  constructor() {
    const result = exampleFunction();
    console.log(result);
  }
}
