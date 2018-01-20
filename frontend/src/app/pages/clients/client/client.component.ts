import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client: Client;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
