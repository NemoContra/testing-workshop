import { Component } from '@angular/core';
import { getQueryParam } from './get-query-params';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  template: `<span>{{ test$ | async }}</span>`,
})
class TestComponent {
  test$ = getQueryParam('test');
}

describe('GetQueryParam', () => {
  const createComponent = createComponentFactory({
    component: TestComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          queryParamMap: of(new Map([['test', 'eintest']])),
        },
      },
    ],
  });

  it('should resolve the queryParam', async () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
