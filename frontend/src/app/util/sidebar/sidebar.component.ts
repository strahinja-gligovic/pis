import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../security/auth.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  onResize(event) {
    const width = event.target.innerWidth;
    if (width < 760) {
      this.sidebarService.toggleSidebar(false);
    }
  }
}
