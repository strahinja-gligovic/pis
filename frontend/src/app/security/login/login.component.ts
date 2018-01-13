import { User } from './../../models/user.model';
import { AuthService } from './../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { NbAuthService, NB_AUTH_OPTIONS_TOKEN, NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {

  error;
  user = new User();
  submitted = false;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.user.username = params['user'];
    });
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
