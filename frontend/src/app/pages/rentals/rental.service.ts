import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Rental } from '../../models/rental.model';

@Injectable()
export class RentalService {

  constructor(private http: HttpClient) {
  }

  getRental(rental_id): Observable<Rental> {
    return this.http.get('/api/rental/get/' + rental_id)
      .map(response => new Rental(response));
  }

  listRentals(): Observable<Rental[]> {
    return this.http.get('/api/rental/list/')
      .map(response => <Rental[]>response);
  }

  private addRental(rental: Rental): Observable<Rental> {
    return this.http.post('/api/rental/add/', rental)
      .map(response => new Rental(response));
  }

  private updateRental(rental: Rental): Observable<Rental> {
    return this.http.put('/api/rental/update/', rental)
      .map(response => new Rental(response));
  }

  deleteRental(rental_id: String): Observable<String> {
    return this.http.delete('/api/rental/delete/' + rental_id, { responseType: 'text' });
  }

  saveRental(rental: Rental): Observable<Rental> {
    if (rental._id) {
      return this.updateRental(rental);
    } else {
      return this.addRental(rental);
    }
  }

}
