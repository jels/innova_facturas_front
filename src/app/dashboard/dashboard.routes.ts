import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScannComponent } from './scann/scann.component';
import { ReportsComponent } from './reports/reports.component';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'scanning',
        component: ScannComponent,
      },
      // {
      //   path: 'reports',
      //   component: ReportsComponent,
      // },
      {
        path: '**',
        component: HomeComponent,
      },
      // {
      //   path: '**',
      //   component: ScannComponent,
      // },
    ],
  },
];
