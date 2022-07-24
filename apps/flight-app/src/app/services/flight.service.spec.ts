import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { FlightService } from './flight.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { createSpyObserver } from '@testing-workshop/shared/util/test-helpers';
import { Flight } from '@testing-workshop/shared/util/api-interfaces';
import { HttpStatusCode } from '@angular/common/http';
import { flights } from '@testing-workshop/shared/util/mock-data';

describe('FlightService', () => {
  let spectator: SpectatorService<FlightService>;
  let httpTestingController: HttpTestingController;

  const createService = createServiceFactory({
    service: FlightService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    httpTestingController = spectator.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  describe('getFlights', () => {
    it('should getFlights with success', () => {
      const spyObserver = createSpyObserver();
      spectator.service.getFlights().subscribe(spyObserver);

      const testRequest = httpTestingController.expectOne('/api/flight');
      testRequest.flush(flights);

      expect(spyObserver).toMatchSnapshot();
    });

    it('should getFlights with error', () => {
      const spyObserver = createSpyObserver();
      spectator.service.getFlights().subscribe(spyObserver);

      const testRequest = httpTestingController.expectOne('/api/flight');
      testRequest.flush(
        { error: 'Internal Server Error' },
        {
          status: HttpStatusCode.InternalServerError,
          statusText: 'Internal Server Error',
        }
      );

      expect(spyObserver).toMatchSnapshot();
    });
  });

  describe('searchFlights', () => {
    describe.each`
      from         | to           | expectedUrl
      ${undefined} | ${undefined} | ${'/api/flight'}
      ${'Graz'}    | ${undefined} | ${'/api/flight?from=Graz'}
      ${undefined} | ${'Hamburg'} | ${'/api/flight?to=Hamburg'}
      ${'Graz'}    | ${'Hamburg'} | ${'/api/flight?from=Graz&to=Hamburg'}
    `('from $from to $to', ({ from, to, expectedUrl }) => {
      it('should be successful', () => {
        const spyObserver = createSpyObserver();
        spectator.service.searchFlights({ from, to }).subscribe(spyObserver);

        const testRequest = httpTestingController.expectOne(expectedUrl);

        const flight: Flight = {
          id: 1,
          from,
          to,
          date: '2020-10-12T06:22:52.4208588+00:00',
          delayed: false,
        };
        testRequest.flush([flight]);

        expect(spyObserver).toMatchSnapshot();
      });

      it('should fail', () => {
        const spyObserver = createSpyObserver();
        spectator.service.searchFlights({ from, to }).subscribe(spyObserver);

        const testRequest = httpTestingController.expectOne(expectedUrl);

        testRequest.flush(
          { error: 'Internal Server Error' },
          {
            status: HttpStatusCode.InternalServerError,
            statusText: 'Internal Server Error',
          }
        );

        expect(spyObserver).toMatchSnapshot();
      });
    });
  });
});
