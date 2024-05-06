import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { exampleFunction } from '@ukol-01/common';

@Component({
  standalone: true,
  imports: [RouterModule],
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
