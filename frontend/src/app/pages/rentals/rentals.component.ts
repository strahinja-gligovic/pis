import { Component, OnInit, TemplateRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { RentalService } from './rental.service';
import { Observable } from 'rxjs/Observable';
import { Rental } from '../../models/rental.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RentalComponent } from './rental/rental.component';
import { Subscription } from 'rxjs/Subscription';
import { SUCCESS_DURATION, TOASTR_SUCCESS_MESSAGE, TOASTR_ERROR_MESSAGE } from '../../util/const';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RentalsComponent implements OnInit {

  private rentals: Rental[];
  private rentalsChanged: Subscription;

  // UI
  private submitted = false;
  @ViewChild('rentalsTable') table: any;

  constructor(private modalService: BsModalService, private rentalService: RentalService, private toastr: ToastrService) { }

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
    }, error => { this.toggleErrorMessage(error.error); }, () => { this.rentalsChanged.unsubscribe(); });
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
      this.toggleErrorMessage(error.error);
      this.submitted = false;
    });
  }

  getRentals() {
    this.submitted = true;
    this.rentalService.listRentals().subscribe(rentals => {
      this.rentals = rentals;
      this.submitted = false;
    }, error => {
      this.toggleErrorMessage(error.error);
      this.submitted = false;
    });
  }

  private toggleSuccessMessage() {
    this.toastr.success(...TOASTR_SUCCESS_MESSAGE);
  }

  private toggleErrorMessage(error) {
    this.toastr.error(error.errmsg ? error.errmsg : TOASTR_ERROR_MESSAGE, 'Error.');
  }

  private toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
