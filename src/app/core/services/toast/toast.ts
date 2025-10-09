import { Injectable } from '@angular/core';
import { ToastComponent } from '@shared/components/toast/toast';
import { ToastType } from '@shared/models/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastRef?: ToastComponent;

  public register(toast: ToastComponent) {
    this.toastRef = toast;
  }

  public show(
    title: string,
    type: ToastType = 'info',
    message?: string,
  ) {
    this.toastRef?.addMessage({ title, message, type});
  }
}
