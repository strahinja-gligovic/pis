import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  toggled: Boolean;
  @Input() title: String;

  constructor(private sidebarService: SidebarService, private authService: AuthService) { }

  ngOnInit() {
    this.sidebarService.toggled$.subscribe(toggled => {
      this.toggled = toggled;
    });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
  }

}
