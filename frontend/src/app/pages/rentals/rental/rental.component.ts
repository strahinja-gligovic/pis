import { Rental } from './../../../models/rental.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { countries, Address } from '../../../models/address.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { RentalService } from '../rental.service';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html'
})
export class RentalComponent implements OnInit, OnDestroy {

  rental: Rental;
  error: any;
  submitted = false;
  success = false;

  private rentalsChanged$: EventEmitter<Boolean>;

  constructor(private bsModalRef: BsModalRef, private rentalService: RentalService) {
  }

  ngOnInit() {
    this.rentalsChanged$ = new EventEmitter<Boolean>();
  }

  ngOnDestroy(): void {
    this.rentalsChanged$.complete();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveRental() {
    this.submitted = true;

    this.rentalService.saveRental(this.rental).subscribe(res => {
      this.submitted = false;
      this.success = true;
      this.rentalsChanged$.emit(true);

      this.closeModal();
    }, error => {
      this.submitted = false;
      this.success = false;
      this.error = error.error;
    });
  }
}
