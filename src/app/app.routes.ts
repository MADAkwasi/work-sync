import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth/auth';
import { RoleGuard } from '@core/guards/role/role';
import { Roles } from '@shared/models/auth';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((DEFAULT) => DEFAULT.ADMIN_ROUTES),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Roles.ADMIN] },
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((DEFAULT) => DEFAULT.EMPLOYEE_ROUTES),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Roles.USER, Roles.ADMIN] },
  },
  {
    path: 'login',
    loadComponent: () => import('@shared/pages/login/login').then((Default) => Default.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@shared/pages/register/register').then((Default) => Default.Register),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('@shared/pages/unauthorized/unauthorized').then((Default) => Default.Unauthorized),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('@shared/pages/not-found/not-found').then((Default) => Default.NotFound),
  },
];
