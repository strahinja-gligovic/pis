import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../models/address.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { countries } from '../const';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  // UI
  disableInputs = true;
  countries = countries;

  @Input() address: Address;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
