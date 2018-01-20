import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClientService } from './client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientComponent } from './client/client.component';

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

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  // client opcioni parametar
  // ukoliko otvaramo add, ne prosleđujemo ga kao parametar
  openClientModal(client?: Client) {
    // instanciramo praznog klijenta za add
    if (!client) {
      client = new Client({_id: 'desitebra'});
    }
    // kreiramo objekat koji prosleđujemo komponenti u modalu
    // mora da se zove tako
    const initialState = {
      client : client
    };

    this.modalService.show(ClientComponent, { initialState });
  }

}
