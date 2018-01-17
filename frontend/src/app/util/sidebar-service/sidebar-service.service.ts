import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {

  private toggled = false;
  private _toggle = new Subject<Boolean>();
  $toggled = this._toggle.asObservable();

  constructor() {
  }

  toggleSidebar() {
    this.toggled = !this.toggled;
    this._toggle.next(this.toggled);
  }

}
