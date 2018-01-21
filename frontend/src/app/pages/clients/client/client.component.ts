import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Client } from '../../../models/client.model';
import { countries, Address } from '../../../models/address.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  countries = countries;
  client: Client;
  @ViewChild('clientForm') clientForm: NgForm;
  submitted = false;
  error;
  @Output() clientsChanged= new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private clientService: ClientService) { }

  ngOnInit() {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveClient() {
    this.submitted = true;
    const client: Client = this.clientForm.value;
    this.clientService.saveClient(client).subscribe(res => {
      this.submitted = false;
      this.client = new Client(res);
    }, error => {
      this.submitted = false;
      this.error = error.error;
    })
    //this.clientsChanged.emit();
  }

}
