import { SidebarService } from './../../util/sidebar-service/sidebar-service.service';
import { Router } from '@angular/router';
import { AuthService } from './../../security/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toggled = true;

  constructor(private authService: AuthService, private router: Router, private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}
