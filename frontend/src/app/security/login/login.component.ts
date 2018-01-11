import { User } from './../../models/user.model';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { NbAuthService, NB_AUTH_OPTIONS_TOKEN, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError = false;
  user = new User();
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login(): void {
    this.submitted = true;
    this.authService.login(this.user.username, this.user.password)
      .subscribe(() => {
        if (this.authService.isLoggedIn()) {
          this.loginError = false;
        }
      }, error => {
        console.log(error);
        this.loginError = true;
        this.submitted = false;
      });
  }
}
