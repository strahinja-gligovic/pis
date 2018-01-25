import { ERR_USERNAME_TAKEN } from './../../util/const';
import { User } from './../../models/user.model';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.loader.css']
})
export class RegisterComponent {

  error: any;
  success = false;
  submitted = false;
  user: User = new User();

  constructor(protected authService: AuthService,
    protected router: Router) {
  }

  register() {
    this.error = null;
    this.submitted = true;

    this.authService.register(this.user).subscribe(result => {
      this.success = true;
      this.submitted = false;
      console.log(result);
      setTimeout(() => this.router.navigate(['/login'], { queryParams: { user: result.username } }), 2500);
    }, error => {
      this.filterErrorCodes(error);
      this.error = error.error;
      this.submitted = false;
      this.success = false;
    });
  }

  private filterErrorCodes(response) {
    const error = response.error;
    if (error.code === ERR_USERNAME_TAKEN) {
      error.errmsg = 'That username is taken, try a different one!';
    }
  }

}
