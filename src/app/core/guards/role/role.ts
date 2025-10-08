import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { endpoints } from '@shared/constants/endpoints';
import { AuthService } from '@core/services/auth/auth';
import { Roles } from '@shared/models/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly endpoint = endpoints.pages;

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const requiredRoles = next.data?.['roles'] as Roles[] | undefined;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRole = this.authService.getUserRole();

    if (!userRole) {
      this.router.navigate([this.endpoint.loginPage]);
      return false;
    }

    if (requiredRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate([this.endpoint.unauthorized]);
    return false;
  }
}
