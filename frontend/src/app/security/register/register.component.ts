import { User } from './../../models/user.model';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss']
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
      console.log(result);
      setTimeout(() => this.router.navigate(['/login'], { queryParams: { user: result.username } }), 2500);
    }, error => {
      this.error = error.error;
      this.submitted = false;
      this.success = false;
    });
  }


}
