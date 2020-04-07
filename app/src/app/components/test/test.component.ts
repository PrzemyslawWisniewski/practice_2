import { Component, OnInit } from '@angular/core';
import { range, of, Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public one: Observable<number>;
  public two: Observable<string>;

  constructor() {}

  ngOnInit(): void {
    // const one = of(1, 2, 3, 4, 5);
    const one = range(1, 5);
    const two = of('a', 'b', 'c', 'd', 'e');

    // const source$ = fromEvent(document, 'click');
    // const source$ = fromEvent(document, 'keyup');
    // const keyup$ = source$.pipe(map((event: KeyboardEvent) => event.code));
    // const keyupWithPluck$ = source$.pipe(pluck('key'));
    // const filter$ = keyup$.pipe(filter((res) => res === 'Enter'));

    // const sourceXHR$ = from(fetch('https://api.github.com/users/octocat'));
    // const sourceYield$ = from(iterator);

    // keyup$.subscribe(console.log);
    // filter$.subscribe(console.log);
    // keyupWithPluck$.subscribe(console.log);

    one.subscribe(console.log);
  }
}
