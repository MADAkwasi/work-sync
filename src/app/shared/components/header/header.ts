import { Component, inject, OnInit, signal } from '@angular/core';
import { endpoints } from '@shared/constants/endpoints';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import { Avatar } from '../avatar/avatar';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { AuthService } from '@core/services/auth/auth';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessagePipe } from '@core/pipes/error-message/error-message';
import { UserService } from '@core/services/user/user';
import { toastNotifications } from '@shared/constants/toast';
import { Roles } from '@shared/models/auth';
import { finalize } from 'rxjs';
import { ToastService } from '@core/services/toast/toast';

@Component({
  selector: 'app-header',
  imports: [
    Icon,
    Button,
    Avatar,
    RouterModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    SelectModule,
    ReactiveFormsModule,
    ErrorMessagePipe,
  ],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly toast = inject(ToastService);
  private readonly endpoint = endpoints.pages;
  protected readonly userInitials = signal('');
  protected readonly isCurrentRouteRequestFrom = signal(false);
  protected readonly isSubmitting = signal(false);
  protected readonly isModalOpen = signal(false);
  protected readonly isAdmin = signal(false);
  protected readonly isMenuOpen = signal(false);
  protected readonly options: { role: Roles }[] = [{ role: Roles.ADMIN }, { role: Roles.USER }];

  protected readonly userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const initials = username?.split(' ').map((n) => n[0]);

    if (initials) this.userInitials.set(initials.join('').toUpperCase());

    const paths = this.router.url.split('/');
    this.isCurrentRouteRequestFrom.set(paths[2] === 'request-leave');
    this.isAdmin.set(paths[1] === 'admin');
  }

  protected handleLeaveRequest(): void {
    this.router.navigate([this.endpoint.requestLeave]);
    this.isMenuOpen.set(false);
  }

  protected handleLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate([this.endpoint.loginPage]);
        this.isMenuOpen.set(false);
      },
    });
  }

  protected handleModalCancel(): void {
    this.isModalOpen.set(false);
    this.userForm.reset();
  }

  protected handleModalOpen(): void {
    this.isModalOpen.set(true);
    this.isMenuOpen.set(false);
  }

  protected handleUserRegistration(): void {
    this.isModalOpen.set(false);

    if (this.userForm.invalid) return;

    const { username, role, password } = this.userForm.value;

    if (!username || !role || !password) return;

    this.isSubmitting.set(true);
    const { operations, status } = toastNotifications;

    this.userService
      .createNewUser({
        username,
        role: role as Roles,
        password,
      })
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.toast.show(operations.userSuccess, status.success);
          this.userForm.reset();
          this.isModalOpen.set(false);
          this.isMenuOpen.set(false);
        },
        error: ({ error }) => this.toast.show(operations.userFailed, status.error, error.message),
      });
  }

  protected handleMenuToggle(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}
