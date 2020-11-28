import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent
  // },
  {
    path: '',
    redirectTo : "login"
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
