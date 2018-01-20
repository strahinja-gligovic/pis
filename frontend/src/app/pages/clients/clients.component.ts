import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClientService } from './client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

}
