import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((DEFAULT) => DEFAULT.ADMIN_ROUTES),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((DEFAULT) => DEFAULT.EMPLOYEE_ROUTES),
  },
  {
    path: 'login',
    loadComponent: () => import('./shared/pages/login/login').then((Default) => Default.Login),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
