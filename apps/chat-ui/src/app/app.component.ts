import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'chat-ui';
}
