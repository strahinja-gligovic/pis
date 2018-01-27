import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  countdownNumbers: Array<Number>;
  interval = 1000;
  countdownStart = 3;
  intervalRef: NodeJS.Timer;

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.countdownNumbers = [];
      this.intervalRef = setInterval(() => {
        this.countdownNumbers.push(this.countdownStart--);
        if (this.countdownStart === -1) {
          clearInterval(this.intervalRef);
          this.goBack();
        }
      }, this.interval);
    }, this.interval);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }

  goBack() {
    this.router.navigate(['']);
  }

}
