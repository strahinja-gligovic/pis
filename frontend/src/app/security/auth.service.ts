import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
// modul za lakše upravljanje vremenom
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  // Čuvamo vreme isteka tokena
  expiresAt;
  loggedInUsername: String;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    if (this.cookieService.get('id_token')) {
      this.expiresAt = this.cookieService.get('expires_at');
      this.loggedInUsername = this.cookieService.get('username');
    }
  }

  login(username: string, password: string) {
    return this.http.post<User>('/api/login', { username, password })
      .do(response => this.setSession(response))
      // simuliramo reakciju
      .delay(1000);
  }

  register(user: User) {
    return this.http.post<User>('/api/register', user)
        .delay(1000);
  }

  // postavlja cookies i računa vreme isteka tokena
  private setSession(authResult) {
    this.expiresAt = moment().add(authResult.expiresIn, 'second');
    this.loggedInUsername = authResult.user.username;
    this.cookieService.put('username', authResult.user.username);
    this.cookieService.put('id_token', authResult.token);
    this.cookieService.put('expires_at', JSON.stringify(this.expiresAt.valueOf()));
  }

  // briše sve podatke o autentifikaciji
  logout() {
    this.cookieService.remove('id_token');
    this.cookieService.remove('expires_at');
    this.cookieService.remove('username');
    this.expiresAt = null;
    this.loggedInUsername = null;
    this.router.navigate(['login']);
  }

  public isLoggedIn() {
    if (this.expiresAt) {
      return moment().isBefore(this.getExpiration());
    } else {
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = this.cookieService.get('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
