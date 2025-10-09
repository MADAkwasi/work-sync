import { AfterViewInit, Component, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from '@core/services/toast/toast';
import { ToastComponent } from '@shared/components/toast/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, ToastComponent],
  styleUrl: './app.css',
})
export class App implements AfterViewInit{
  private readonly toastService = inject(ToastService)
  private readonly toast = viewChild(ToastComponent);

    ngAfterViewInit(): void {
    this.toastService.register(this.toast() as ToastComponent);
  }
}
