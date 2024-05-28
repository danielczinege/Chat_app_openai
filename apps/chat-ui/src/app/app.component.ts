import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { exampleFunction } from '@ukol-01/common';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet],
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
