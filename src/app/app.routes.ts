import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  // },

  // {
  //   path: 'login',
  //   loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  // },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  // },
  {
    path: '**',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },

  // {
  //   path: '',
  //   loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  // },
  // {
  //   path: '**',
  //   loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  // },
];
