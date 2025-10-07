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
  ],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private readonly router = inject(Router);
  protected readonly isCurrentRouteRequestFrom = signal(false);
  protected readonly isModalOpen = signal(false);
  protected readonly isAdmin = signal(false);
  private readonly endpoint = endpoints.pages;

  ngOnInit(): void {
    const paths = this.router.url.split('/');
    this.isCurrentRouteRequestFrom.set(paths[2] === 'request-leave');
    this.isAdmin.set(paths[1] === 'admin');
  }

  protected handleLeaveRequest(): void {
    this.router.navigate([this.endpoint.requestLeave]);
  }

  protected handleLogout(): void {
    this.router.navigate([this.endpoint.loginPage]);
  }

  protected handleModalCancel(): void {
    this.isModalOpen.set(false);
  }

  protected handleUserRegistration(): void {
    this.isModalOpen.set(false);
  }
}
