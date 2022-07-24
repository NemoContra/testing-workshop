import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { getQueryParam } from '@testing-workshop/client-shared/util/common';
import { skipFalsy } from '@testing-workshop/shared/util/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private easterEgg$ = getQueryParam('easteregg');
  private destroy$$ = new Subject<void>();

  ngOnInit(): void {
    this.easterEgg$
      .pipe(skipFalsy(), takeUntil(this.destroy$$))
      .subscribe(() => alert('Congrats! You have found an easter egg!'));
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }
}
