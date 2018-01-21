import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../util/sidebar/sidebar.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  toggled: Boolean;

  constructor(private authService: AuthService, private router: Router,
    private sidebarService: SidebarService) {
  }

  ngOnInit() {
    this.sidebarService.toggled$.subscribe(toggled => {
      this.toggled = toggled;
    })
  }

  logout() {
    this.authService.logout();
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

}
