import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../models/address.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  // UI
  disableInputs = true;

  @Input() address: Address;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
