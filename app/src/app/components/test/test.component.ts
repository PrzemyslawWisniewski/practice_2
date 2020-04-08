import { Component, OnInit, OnDestroy } from '@angular/core';
import { range, of, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

    one$.pipe(takeUntil(this.unsubscribeAll$)).subscribe(console.log);
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
