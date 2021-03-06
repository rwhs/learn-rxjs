import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent implements OnInit {
  timer: number;
  manualTenthSecondInterval$: Observable<any>;
  builtInTenthSecondInterval$: Observable<any>;
  stopClick$ = new Subject();

  constructor() {
    this.timer = 0;
    this.manualTenthSecondInterval$ = new Observable(observer => {
      let counter = 0;
      observer.next(counter);

      const interval = setInterval(() => {
        counter++;
        observer.next(counter);
      }, 100);
      return function unsubscribe() {
        clearInterval(interval);
      };
    });

    this.builtInTenthSecondInterval$ = interval(100);
  }

  ngOnInit(): void {
    console.log('Initialized stopwatch component');
  }

  displayAsTenthOfSeconds(): void {
    this.builtInTenthSecondInterval$
      .pipe(
        map(tenthSecond => tenthSecond / 10),
        takeUntil(this.stopClick$),
      )
      .subscribe(res => {
        this.timer = res;
      });
  }

  startButtonClicked(): void {
    console.log('Start button clicked');
    this.displayAsTenthOfSeconds();
  }

  stopButtonClicked(): void {
    console.log('Start button clicked');
    this.stopClick$.next();
    this.stopClick$.subscribe();
  }
}
