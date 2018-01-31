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
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class AuthService implements OnInit {
  // Čuvamo vreme isteka tokena
  expiresAt;
  loggedInUser: User;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    if (this.cookieService.get('id_token')) {
      this.expiresAt = this.cookieService.get('expires_at');
    }
    this.loggedInUser = new User();
    this.loggedInUser.username = this.cookieService.get('username');
    this.loggedInUser._id = this.cookieService.get('user_id');
  }

  ngOnInit(): void {

  }


  login(username: String, password: String) {
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
    this.loggedInUser = new User(authResult.user);
    this.cookieService.put('username', authResult.user.username);
    this.cookieService.put('user_id', authResult.user._id);
    this.cookieService.put('id_token', authResult.token);
    this.cookieService.put('expires_at', JSON.stringify(this.expiresAt.valueOf()));
  }

  // briše sve podatke o autentifikaciji
  logout() {
    this.cookieService.remove('id_token');
    this.cookieService.remove('expires_at');
    this.cookieService.remove('username');
    this.expiresAt = null;
    this.loggedInUser = null;
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
