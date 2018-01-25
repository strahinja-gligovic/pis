import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ClientService } from './client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientComponent } from './client/client.component';
import { Subscription } from 'rxjs/Subscription';
import { Address, countries } from '../../models/address.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  // referenca na osluškivanje promena u Client modalu
  clientsChanged: Subscription;

  // ***TEMPLATE MODAL***
  // smeštamo adresu koju želimo da prikažemo u modalu
  selectedAddress: Address;
  // povratna vrednost metode koja otvara modal, služi da bi isti mogli da zatvorimo
  addressModalRef: BsModalRef;
  // činimo uveženu promenljivu dostupnom na template
  countries = countries;

  // UI
  success = false;

  constructor(private modalService: BsModalService, private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  // ***COMPONENT MODAL***
  // client opcioni parametar
  // ukoliko otvaramo add, ne prosleđujemo ga kao parametar
  openClientModal(client?: Client) {
    // instanciramo praznog klijenta za add
    if (!client) {
      client = new Client();
    } else {
      // instanciramo ga ponovo da bi inicijalizovali Date objekat
      // iz template dobijamo vrednosti u string formatu
      client = new Client(client);
    }

    // kreiramo objekat koji prosleđujemo komponenti u modalu
    // mora da se zove tako
    const initialState = {
      client: client
    };

    // ostaje nam reference na otvoreni modal
    const modalRef = this.modalService.show(ClientComponent, { initialState });

    // pristupamo poljima u okviru komponente koja se nalazi u modalu
    // ukoliko korisnik uspešno izmeni klijenta, ponovo povlačimo podatke
    this.clientsChanged = modalRef.content.clientsChanged$.subscribe(changed => {
      if (changed) {
        this.getClients();
        this.toggleSuccessMessage();
      }
    }, error => { }, () => { this.clientsChanged.unsubscribe(); });
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client._id).subscribe(res => {
      this.toggleSuccessMessage();
      for (let i = 0; i < this.clients.length; i++) {
        const element = this.clients[i];
        if (element._id === client._id) {
          this.clients.splice(i, 1);
        }
      }
    }, error => {
    });
  }

  getClients() {
    this.clientService.listClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  // ***TEMPLATE MODAL***
  openAddressModal(address: Address, template: TemplateRef<any>) {
    this.selectedAddress = address;
    this.addressModalRef = this.modalService.show(template);
  }

  private toggleSuccessMessage() {
    const duration = 3000;

    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, duration);
  }

}
