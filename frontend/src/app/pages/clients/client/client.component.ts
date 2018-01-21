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

  // ovom deklaracijom činimo dostupnim niz u template
  countries = countries;

  client: Client;
  @ViewChild('clientForm') clientForm: NgForm;
  error: any;
  madeChanges = false;
  submitted = false;
  success = false;
  
  private clientsChanged$: EventEmitter<Boolean>;

  constructor(private bsModalRef: BsModalRef, private clientService: ClientService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.clientsChanged$.emit(this.madeChanges);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveClient() {    
    const client: Client = this.clientForm.value;
    this.submitted = true;

    this.clientService.saveClient(client).subscribe(res => {
      this.submitted = false;
      this.success = true;
      this.madeChanges = true;
    }, error => {
      this.submitted = false;
      this.success = false;
      this.error = error.error;
    })
  }
}
