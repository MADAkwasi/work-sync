import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [
    IconFieldModule,
    ButtonModule,
    InputIconModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './login.html',
})
export class Login {}
