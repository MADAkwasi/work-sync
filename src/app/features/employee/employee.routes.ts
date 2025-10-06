import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((DEFAULT) => DEFAULT.Dashboard),
  },
  {
    path: 'request-leave',
    loadComponent: () =>
      import('./pages/leave-request/leave-request').then((DEFAULT) => DEFAULT.LeaveRequest),
  },
];
