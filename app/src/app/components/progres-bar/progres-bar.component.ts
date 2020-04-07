import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-progres-bar',
  templateUrl: './progres-bar.component.html',
  styleUrls: ['./progres-bar.component.scss']
})
export class ProgresBarComponent implements OnInit {
  public widthPercent: number;

  constructor() {}

  ngOnInit() {
    // const progressBar = document.querySelector('.progress-bar');
    // const progres$ = scrollEvents$.pipe(map(({ target }) => this.calculateScrollPercent(target.documentElement)));
    const scrollEvents$ = fromEvent(document, 'scroll');
    const progres$ = scrollEvents$.pipe(map(({ target }: any) => this.calculateScrollPercent(target.documentElement)));

    scrollEvents$.subscribe(console.log);

    progres$.subscribe((percent) => {
      // progressBar.style.width = `${percent}`;
      this.widthPercent = percent;
    });
  }

  public calculateScrollPercent(el: Element) {
    const { scrollTop, scrollHeight, clientHeight } = el;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
}
