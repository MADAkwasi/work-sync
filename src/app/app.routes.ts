import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [],
  },
  {
    path: 'login',
    loadComponent: () => import('./shared/pages/login/login').then((Default) => Default.Login),
  },
];
