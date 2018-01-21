import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../models/client.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client: Client;
  @ViewChild('clientForm') clientForm: NgForm;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveClient() {
    console.log(this.clientForm.value);
  }

}
