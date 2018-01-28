import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { RentalService } from './rental.service';
import { Observable } from 'rxjs/Observable';
import { Rental } from '../../models/rental.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RentalComponent } from './rental/rental.component';
import { Subscription } from 'rxjs/Subscription';
import { Address, countries } from '../../models/address.model';
import { SUCCESS_DURATION } from '../../util/const';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RentalsComponent implements OnInit {

  rentals: Rental[];
  rentalsChanged: Subscription;

  // UI
  success = false;
  error: any;
  submitted = false;

  constructor(private modalService: BsModalService, private rentalService: RentalService) { }

  ngOnInit() {
    this.getRentals();
  }

  openRentalModal(rental?: Rental) {
    if (!rental) {
      rental = new Rental();
    } else {
      rental = new Rental(rental);
    }

    const initialState = {
      rental: rental
    };

    const modalRef = this.modalService.show(RentalComponent, { initialState });

    this.rentalsChanged = modalRef.content.rentalsChanged$.subscribe(changed => {
      if (changed) {
        this.getRentals();
        this.toggleSuccessMessage();
      }
    }, error => { this.error = error; }, () => { this.rentalsChanged.unsubscribe(); });
  }

  deleteRental(rental: Rental) {
    this.submitted = true;
    this.rentalService.deleteRental(rental._id).subscribe(res => {
      for (let i = 0; i < this.rentals.length; i++) {
        const element = this.rentals[i];
        if (element._id === rental._id) {
          this.rentals.splice(i, 1);
          this.rentals = [...this.rentals];
        }
      }
      this.submitted = false;
      this.toggleSuccessMessage();
    }, error => {
      this.error = error;
      this.submitted = false;
    });
  }

  getRentals() {
    this.submitted = true;
    this.rentalService.listRentals().subscribe(rentals => {
      this.rentals = rentals;
      this.submitted = false;
    }, error => {
      this.error = error;
      this.submitted = false;
    });
  }

  private toggleSuccessMessage() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, SUCCESS_DURATION);
  }

}
