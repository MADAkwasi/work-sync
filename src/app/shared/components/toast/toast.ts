import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Icon } from '../icon/icon';
import { Toast } from '@shared/models/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, Icon],
  templateUrl: './toast.html',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ToastComponent {
  protected readonly toasts = signal<Toast[]>([]);

  public addMessage(toast: Omit<Toast, 'id'>) {
    const id = Date.now();
    this.toasts.update((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => this.removeToast(id), 5000);
  }

  public removeToast(id: number) {
    this.toasts.update((prev) => prev.filter((toast) => toast.id !== id));
  }
}
