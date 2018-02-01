import { Client } from './../../../models/client.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { ClientService } from '../client.service';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, OnDestroy {

  client: Client;
  error: any;
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
    this.clientsChanged$.complete();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveClient() {
    this.submitted = true;

    this.clientService.saveClient(this.client).subscribe(res => {
      this.submitted = false;
      this.success = true;
      // ukoliko se izmene naprave obaveštavamo parent komponentu
      // hoćemo ponovo da učitamo podatke ukoliko je to slučaj
      this.clientsChanged$.emit(true);

      this.closeModal();
    }, error => {
      this.submitted = false;
      this.success = false;
      this.error = error.error;
    });
  }
}
