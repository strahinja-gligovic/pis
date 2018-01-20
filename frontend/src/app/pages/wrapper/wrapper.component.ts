import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  toggled =  true;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.toggled = !this.toggled;
  }

}
