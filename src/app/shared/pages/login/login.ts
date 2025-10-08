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
import { RouterLink } from '@angular/router';import { Auth } from '@core/services/auth/auth';
import { HttpResourceRef } from '@angular/common/http';
import { AuthResponse } from '@shared/models/auth';

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
  ],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);
  protected readonly loginResource = signal<HttpResourceRef<AuthResponse | undefined> | null>(null);
  protected readonly loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    if (!username || !password) return;

    this.loginResource.set(this.authService.login({ username, password }));
  }
}
