import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ClientService } from './client.service';
import { Observable } from 'rxjs/Observable';
import { Client } from '../../models/client.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientComponent } from './client/client.component';
import { Subscription } from 'rxjs/Subscription';
import { Address } from '../../models/address.model';
import { SUCCESS_DURATION } from '../../util/const';
import { AddressComponent } from '../../util/address/address.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  // referenca na osluškivanje promena u Client modalu
  clientsChanged: Subscription;

  // UI
  success = false;
  error: any;
  submitted = false;

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
    const clientComponentState = {
      client: client
    };

    // ostaje nam referenca na otvoreni modal
    const modalRef = this.modalService.show(ClientComponent, { initialState : clientComponentState });

    // pristupamo poljima u okviru komponente koja se nalazi u modalu
    // ukoliko korisnik uspešno izmeni klijenta, ponovo povlačimo podatke
    this.clientsChanged = modalRef.content.clientsChanged$.subscribe(changed => {
      if (changed) {
        this.getClients();
        this.toggleSuccessMessage();
      }
    }, error => { this.error = error; }, () => { this.clientsChanged.unsubscribe(); });
  }

  deleteClient(client: Client) {
    this.submitted = true;
    // delete je jednostavna operacija, ne želimo ponovo da povlačimo podatke i bespotrebne zahteve ka serveru
    this.clientService.deleteClient(client._id).subscribe(res => {
      // iz postojećeg niza klijenata pronalazimo onog koga smo upravo obrisali
      for (let i = 0; i < this.clients.length; i++) {
        const element = this.clients[i];
        // svaki klijent koji je u tabeli se nalazi u db
        // mora imati _id
        if (element._id === client._id) {
          this.clients.splice(i, 1);
          // ngx-datatable detektor promena
          this.clients = [...this.clients];
        }
      }
      this.submitted = false;
      this.toggleSuccessMessage();
    }, error => {
      this.error = error;
      this.submitted = false;
    });
  }

  getClients() {
    this.submitted = true;
    this.clientService.listClients().subscribe(clients => {
      this.clients = clients;
      this.submitted = false;
    }, error => {
      this.error = error;
      this.submitted = false;
    });
  }

  openAddressModal(address: Address) {
    const addressComponentState = {
      address: address,
      isModal: true,
      disableInputs: true
    };

    this.modalService.show(AddressComponent, { initialState : addressComponentState });
  }

  private toggleSuccessMessage() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, SUCCESS_DURATION);
  }

}
