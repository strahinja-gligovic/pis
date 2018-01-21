import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Client } from '../../../models/client.model';
import { countries, Address } from '../../../models/address.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ClientService } from '../client.service';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  countries = countries;
  client: Client;
  @ViewChild('clientForm') clientForm: NgForm;
  submitted = false;
  error;
  
  private _clientsChanged = new Subject<Boolean>();
  clientsChanged$ = this._clientsChanged.asObservable();

  constructor(private bsModalRef: BsModalRef, private clientService: ClientService) { }

  ngOnInit() {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveClient() {    
    const client: Client = this.clientForm.value;
    this.submitted = true;

    this.clientService.saveClient(client).subscribe(res => {
      this.submitted = false;
      this._clientsChanged.next(true);
      this.closeModal();
    }, error => {
      this.submitted = false;
      this.error = error.error;
    })
  }

  ngOnDestroy(): void {
    this._clientsChanged.complete();
  }

}
