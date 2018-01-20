import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  // promenljiva koja čuva referencu na pretplatu iz servisa
  clients$: Observable<Client[]>;
  // promenljiva u kojoj se nalaze podaci zarad lakšeg upravljanja njima
  clients: Client[];

  constructor(clientService: ClientService) { }

  ngOnInit() {
  }

}
