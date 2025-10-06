import { Component, inject, OnInit, signal } from '@angular/core';
import { endpoints } from '@shared/constants/endpoints';
import { Icon } from '../icon/icon';
import { Button } from '../button/button';
import { Avatar } from '../avatar/avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Icon, Button, Avatar],
  templateUrl: './header.html',
})
export class Header implements OnInit {
  private readonly router = inject(Router);
  protected readonly isCurrentRouteRequestFrom = signal(false);
  private readonly endpoint = endpoints.pages;

  ngOnInit(): void {
    const paths = this.router.url.split('/');
    this.isCurrentRouteRequestFrom.set(paths[2] === 'request-leave');
    console.log(this.isCurrentRouteRequestFrom());
  }

  protected handleLeaveRequest(): void {
    this.router.navigate([this.endpoint.requestLeave]);
  }

  protected handleLogout(): void {
    this.router.navigate([this.endpoint.loginPage]);
  }
}
