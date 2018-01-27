import { AuthService } from './security/auth.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { environment } from '../environments/environment';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

}
