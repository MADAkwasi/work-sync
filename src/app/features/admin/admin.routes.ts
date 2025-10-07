import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((DEFAULT) => DEFAULT.Dashboard),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar').then((DEFAULT) => DEFAULT.Calendar),
  },
];
