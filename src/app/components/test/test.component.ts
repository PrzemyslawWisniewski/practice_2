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

  nestingFunction(resp) {
    const response = {
      items: [
        {
          id: 1,
          title: 'Item 1',
          parent_id: null
        },
        {
          id: 2,
          title: 'Item 2',
          parent_id: 1
        },
        {
          id: 3,
          title: 'Item 3',
          parent_id: 2
        },
        {
          id: 4,
          title: 'Item 4',
          parent_id: null
        },
        {
          id: 5,
          title: 'Item 5',
          parent_id: null
        },
        {
          id: 6,
          title: 'Item 6',
          parent_id: 5
        },
        {
          id: 7,
          title: 'Item 7',
          parent_id: 6
        },
        {
          id: 8,
          title: 'Item 8',
          parent_id: 6
        }
      ]
    };

    const nest = (items, id = null, link = 'parent_id') =>
      items.filter((item) => item[link] === id).map((item) => ({ ...item, children: nest(items, item.id) }));

    console.log(nest(response));
    return nest(response);
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
