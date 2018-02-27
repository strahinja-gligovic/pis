import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../models/address.model';
import { countries } from '../const';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  // ovom deklaracijom činimo dostupnim niz u template
  countries = countries;

  // UI
  disableInputs = true;

  @Input() address: Address;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
