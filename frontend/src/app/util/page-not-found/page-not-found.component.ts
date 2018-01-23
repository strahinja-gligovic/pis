import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  countdownNumbers: Array<Number>;
  interval = 1000;
  countdownStart = 3;

  constructor(private location: Location) { }

  ngOnInit() {
    setTimeout(() => {
      this.countdownNumbers = Array<Number>(this.countdownStart - 1);
      const intervalRef = setInterval(() => {
        this.countdownNumbers.push(this.countdownStart);
        this.countdownStart--;
        if (!this.countdownStart) {
          clearInterval(intervalRef);
          this.goBack();
        }
      }, this.interval);
    }, this.interval);
  }

  goBack() {
    this.location.back();
  }

}
