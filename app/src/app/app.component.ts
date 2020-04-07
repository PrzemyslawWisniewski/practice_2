import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber, of, fromEvent, range, from } from 'rxjs';
import { map, pluck, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor() {}

  ngOnInit(): void {
    // const observer = {
    //   next: (val) => console.log('next', val),
    //   error: (error) => console.log('error', error),
    //   complete: () => console.log('complete')
    // };
    // function* hello() {
    //   yield 'Hello';
    //   yield 'World';
    // }
    // const iterator = hello();
    // console.log(iterator.next().value);
    // console.log(iterator.next().value);
    // one.subscribe(observer);
    // sourceXHR$.subscribe(observer);
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
