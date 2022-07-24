import { createServiceFactory } from '@ngneat/spectator/jest';
import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getHTMLBodyElement } from './get-body';

@Injectable()
class TestService {
  body = getHTMLBodyElement();
}

describe('getBodyElement', () => {
  const body = { test: 'body' };

  const createService = createServiceFactory({
    service: TestService,
    providers: [
      {
        provide: DOCUMENT,
        useValue: {
          body,
        },
      },
    ],
  });

  it('should return the mocked body', () => {
    const spectator = createService();
    expect(spectator.service.body).toBe(body);
  });
});
