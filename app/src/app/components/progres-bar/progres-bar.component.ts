import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { fromEvent, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-progres-bar',
  templateUrl: './progres-bar.component.html',
  styleUrls: ['./progres-bar.component.scss']
})
export class ProgresBarComponent implements OnInit, OnDestroy {
  public widthPercent: number;
  public progres$: Observable<number>;
  private unsubscribeAll$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit() {
    this.scrollEventObservable();
    this.subscribeToScroll();
  }

  public scrollEventObservable(): Observable<number> {
    const num = fromEvent(document, 'scroll').pipe(map(({ target }: any) => this.calculateScrollPercent(target.documentElement)));
    return (this.progres$ = num);
  }

  public calculateScrollPercent(el: Element): number {
    const { scrollTop, scrollHeight, clientHeight } = el;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }

  public subscribeToScroll(): void {
    this.progres$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((percent) => {
      this.widthPercent = percent;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }
}
