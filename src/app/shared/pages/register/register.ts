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
import { passwordsMatchValidator } from '@shared/validators/validator';
import { AuthService } from '@core/services/auth/auth';
import { finalize } from 'rxjs';
import { endpoints } from '@shared/constants/endpoints';
import { toastNotifications } from '@shared/constants/toast';
import { ToastService } from '@core/services/toast/toast';
import { Loader } from '@shared/components/loader/loader';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.html',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly paths = endpoints.pages;
  protected readonly isSubmitting = signal(false);
  protected readonly registrationForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator }
  );

  protected onSubmit(): void {
    if (this.registrationForm.invalid) return;

    const { username, password } = this.registrationForm.value;
    if (!username || !password) return;

    this.isSubmitting.set(true);
    const { operations, status } = toastNotifications;

    this.authService
      .register({ username, password })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.router.navigate([this.paths.employeeDashboard]);
        },
        error: ({ err }) =>
          this.toast.show(operations.registrationFailed, status.error, err.message),
      });
  }
}
