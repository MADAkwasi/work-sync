import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ButtonModule],
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('work-sync');
}
