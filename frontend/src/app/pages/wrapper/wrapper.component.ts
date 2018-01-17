import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../util/sidebar-service/sidebar-service.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  toggled: Boolean;

  constructor(private authService: AuthService, private router: Router, private sidebarService: SidebarService) {
    sidebarService.$toggled.subscribe((toggled) => this.toggled = toggled);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
