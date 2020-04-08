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
