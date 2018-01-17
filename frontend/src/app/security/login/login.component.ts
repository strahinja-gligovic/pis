import { User } from './../../models/user.model';
import { AuthService } from './../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error;
  user = new User();
  submitted = false;
  passwordField;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  login(): void {
    this.submitted = true;
    this.authService.login(this.user.username, this.user.password)
      .subscribe(() => {
        if (this.authService.isLoggedIn()) {
          this.error = null;
          this.router.navigate(['/']);
        }
      }, error => {
        this.error = error.error;
        this.submitted = false;
        console.log(error);
      });
  }
}
