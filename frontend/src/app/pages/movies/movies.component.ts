import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../util/sidebar-service/sidebar-service.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
