import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { getQueryParam } from '@testing-workshop/client-shared/util/common';
import { skipFalsy } from '@testing-workshop/shared/util/common';
import { Subject, takeUntil } from 'rxjs';
import { WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private easterEgg$ = getQueryParam('easteregg');
  private destroy$$ = new Subject<void>();

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit(): void {
    this.easterEgg$
      .pipe(skipFalsy(), takeUntil(this.destroy$$))
      .subscribe(() =>
        this.window.alert('Congrats! You have found an easter egg!')
      );
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }
}
