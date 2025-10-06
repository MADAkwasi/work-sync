import { Component, inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessagePipe } from '@core/pipes/error-message/error-message';
import { Button } from '@shared/components/button/button';


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
  ],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  protected readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected onSubmit(): void {
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);
  }
}
