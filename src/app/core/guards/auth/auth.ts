import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth';
import { ToastService } from '@core/services/toast/toast';
import { toastNotifications } from '@shared/constants/toast';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    const { operations, status, messages } = toastNotifications;
    this.toast.show(operations.accessDenied, status.error, messages.cantView);
    this.router.navigate(['/login']);
    return false;
  }
}
