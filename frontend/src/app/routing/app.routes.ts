import { WrapperComponent } from './../pages/wrapper/wrapper.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PageNotFoundComponent } from './../util/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './../pages/home/home.component';
import { RegisterComponent } from './../security/register/register.component';
import { LoginComponent } from './../security/login/login.component';
import { AppComponent } from './../app.component';
import { Routes } from '@angular/router';
import { MoviesComponent } from '../pages/movies/movies.component';
import { ClientsComponent } from '../pages/clients/clients.component';
import { RentalsComponent } from '../pages/rentals/rentals.component';

export const routes: Routes = [
  {
    path: 'auth', component: WrapperComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'movies', component: MoviesComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'rentals', component: RentalsComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'auth', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/404', pathMatch: 'full', canActivate: [AuthGuard] },
];
