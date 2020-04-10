import { Component, OnInit, OnDestroy } from '@angular/core';
import { range, of, Observable, Subject, from, Subscription } from 'rxjs';
import { takeUntil, reduce, scan, map } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {
  public one$: Observable<number>;
  public two$: Observable<string>;

  private unsubscribeAll$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {
    // const one = of(1, 2, 3, 4, 5);
    const one$ = range(1, 5);
    const two$ = of('a', 'b', 'c', 'd', 'e');

    // const sourceXHR$ = from(fetch('https://api.github.com/users/octocat'));
    // const sourceYield$ = from(iterator);

    // one$.pipe(takeUntil(this.unsubscribeAll$)).subscribe(console.log);

    // this.reduceExample();
    // this.scanExample();
  }

  private reduceExample(): Subscription {
    const numbers = [1, 2, 3, 4, 5];

    return from(numbers)
      .pipe(
        takeUntil(this.unsubscribeAll$),
        reduce((acc, cur, i) => {
          console.log('Reduce example: ', { acc, cur, i }, acc + cur);
          return acc + cur;
        }, 0)
      )
      .subscribe({
        // next() {},
        next: console.log,
        error: console.error,
        complete: () => console.log('Reduce Complete! ')
      });
  }

  private scanExample(): [Subscription, Subscription] {
    const numbers = [1, 2, 3, 4, 5];
    const user = [
      { name: 'Brian', loggedIn: false, token: null },
      { name: 'Paul', loggedIn: true, token: 'abc' },
      { name: 'Adam', loggedIn: true, token: '123' }
    ];

    const fromNumbers = from(numbers)
      .pipe(
        takeUntil(this.unsubscribeAll$),
        scan((acc, cur, i) => {
          console.log('Scan example_1: ', { acc, cur, i }, acc + cur);
          return acc + cur;
        }, 0)
      )
      .subscribe({
        // next() {},
        next: console.log,
        error: console.error,
        complete: () => console.log('Scan 1 Complete! ')
      });

    const fromUserState = from(user).pipe(
      scan(
        (acc, cur, i) => {
          console.log('Scan example_2: ', { acc, cur, i });
          return { ...acc, ...cur, i };
        },
        { name: null, loggedIn: null, token: null }
      )
    );

    const state = fromUserState
      .pipe(
        takeUntil(this.unsubscribeAll$),
        map((el) => el.name)
      )
      .subscribe({
        // next() {},
        next: console.log,
        error: console.error,
        complete: () => console.log('Scan 2 Complete! ')
      });

    return [fromNumbers, state];
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }
}

// const one = Rx.Observable(1,2,3,4,5);
// const two = Rx.Observable('a', 'b', 'c', 'd', 'e');

// const letterNumber = // return 1a2b3c4d5e ;
// const oneThanTwo = // return 12345abcde ;
// const ohMyThan = // return Oh My Heavens than 12345

// letterNumber.subscribe(val => console.log(val));
// oneThanTwo.subscribe(val => console.log(val));

// function ohMyHeavens() {
//   console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
// }
