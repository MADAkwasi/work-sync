import { status } from './../../constants/filter';
import { endpoints } from '@shared/constants/endpoints';
import { AuthService } from './../../../core/services/auth/auth';
import { Component, inject, signal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessagePipe } from '@core/pipes/error-message/error-message';
import { Button } from '@shared/components/button/button';
import { Icon } from '@shared/components/icon/icon';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '@core/services/toast/toast';
import { Loader } from '@shared/components/loader/loader';
import { finalize } from 'rxjs';
import { toastNotifications } from '@shared/constants/toast';

@Component({
  selector: 'app-login',
  imports: [
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    ErrorMessagePipe,
    Button,
    Icon,
    RouterLink,
    Loader,
  ],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly paths = endpoints.pages;
  protected readonly submitTrigger = signal(false);
  protected readonly isLoggingIn = signal(false);
  protected readonly loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    if (!username || !password) return;

    this.isLoggingIn.set(true);
    const { operations, status } = toastNotifications;

    this.authService
      .login({ username, password })
      .pipe(finalize(() => this.isLoggingIn.set(false)))
      .subscribe({
        next: () => {
          const role = localStorage.getItem('role');

          if (role === 'Admin') this.router.navigate([this.paths.adminDashboard]);
          if (role === 'User') this.router.navigate([this.paths.employeeDashboard]);
        },
        error: ({ error }) => this.toast.show(operations.loginFailed, status.error, error.message),
      });
  }
}
