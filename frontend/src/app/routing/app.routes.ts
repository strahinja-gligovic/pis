import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageNotFoundComponent } from './../util/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './../pages/home/home.component';
import { RegisterComponent } from './../security/register/register.component';
import { LoginComponent } from './../security/login/login.component';
import { AppComponent } from './../app.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent}
  ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home/404', pathMatch: 'full', canActivate: [AuthGuard] },
];
