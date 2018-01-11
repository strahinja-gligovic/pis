import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(username: string, password: string) {
    return this.http.post<User>('/api/login', { username, password })
      .do(response => this.setSession(response))
      .delay(750);
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    this.cookieService.put('id_token', authResult.token);
    this.cookieService.put('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    this.cookieService.remove('id_token');
    this.cookieService.remove('expores_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
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
