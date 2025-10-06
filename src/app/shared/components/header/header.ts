import { endpoints } from './../../constants/endpoints';
import { Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import { Avatar } from '../avatar/avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Icon, Button, Avatar],
  templateUrl: './header.html',
})
export class Header {
  private readonly router = inject(Router);
  private readonly endpoint = endpoints.pages;

  protected handleLeaveRequest(): void {
    this.router.navigate([this.endpoint.requestLeave]);
  }

  protected handleLogout(): void {
    this.router.navigate([this.endpoint.loginPage]);
  }
}
