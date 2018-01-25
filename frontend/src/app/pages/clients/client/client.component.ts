import { Client } from './../../../models/client.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

  // najjednostavniji oblik događaja
  // imamo mogućnost da pravimo događaje sa .emit(), prosleđujemo parametar deklarisanog tipa
  // komponente pretplaćene na ovaj događaja nemaju konstantno uvid u stanje servisa
  // samo kad mi to hoćemo pozivom metode
  // u ovom slučaju nam više i ne treba jer samo hoćemo da po zatvaranju modala obavestimo o promenama
  private clientsChanged$: EventEmitter<Boolean>;

  constructor(private bsModalRef: BsModalRef, private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientsChanged$ = new EventEmitter<Boolean>();
  }

  ngOnDestroy(): void {
    // kada se komponenta gasi obaveštavamo da li su njene akcije prouzrokovale promenu u db
    // hoćemo ponovo da učitamo podatke ukoliko je to slučaj
    this.clientsChanged$.emit(this.madeChanges);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveClient() {
    const client: Client = this.clientForm.value;
    // u formi ne čuvamo vrednost za id
    client._id = this.client._id;
    this.submitted = true;

    this.clientService.saveClient(client).subscribe(res => {
      this.submitted = false;
      this.success = true;
      this.madeChanges = true;

      this.closeModal();
    }, error => {
      this.submitted = false;
      this.success = false;
      this.error = error.error;
    });
  }
}
