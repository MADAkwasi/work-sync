import { Component, inject } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessagePipe } from '@core/pipes/error-message/error-message';
import { Button } from '@shared/components/button/button';
import { Icon } from '@shared/components/icon/icon';
import { RouterLink } from '@angular/router';
import { passwordsMatchValidator } from '@shared/validators/validator';

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
  ],
  templateUrl: './register.html',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  protected readonly registrationForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: passwordsMatchValidator }
  );

  protected onSubmit(): void {
    // if (this.registrationForm.invalid) return;
    console.log(this.registrationForm.controls.confirmPassword.invalid);
  }
}
