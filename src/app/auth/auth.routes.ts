import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';

export const AUTH_ROUTES: Routes = [
    {
      path: '',
      component: AuthComponent,
      children: [
        {
          path: '',
          component: LoginComponent,
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'forgot',
          component: ForgotComponent,
        },
        {
          path: '**',
          component: LoginComponent,
        },
      ],
    },
  ];