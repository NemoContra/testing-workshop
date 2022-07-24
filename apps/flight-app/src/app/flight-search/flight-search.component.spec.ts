import { createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { FlightSearchComponent } from './flight-search.component';
import { MockComponent } from 'ng-mocks';
import { ClientSharedUiFlightCardComponent } from '@testing-workshop/client-shared/ui/flight-card';
import { FlightService } from '../services/flight.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFlightsQueryParams } from '@testing-workshop/shared/util/api-interfaces';
import { fakeAsync, tick } from '@angular/core/testing';
import { testIdSelector } from '@testing-workshop/shared/util/test-helpers';
import { EMPTY, of } from 'rxjs';
import { flights } from '@testing-workshop/shared/util/mock-data';

describe('FlightSearchComponent', () => {
  const createComponent = createComponentFactory({
    component: FlightSearchComponent,
    imports: [
      MockComponent(ClientSharedUiFlightCardComponent),
      ReactiveFormsModule,
    ],
    providers: [
      mockProvider(FlightService, {
        searchFlights: jest.fn().mockReturnValue(EMPTY),
      }),
    ],
  });

  afterEach(() => jest.clearAllMocks());

  const selectors = {
    fromInput: testIdSelector('from'),
    toInput: testIdSelector('to'),
  } as const;

  it('should match snapshot without flights', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });

  it.each`
    from         | to
    ${'Graz'}    | ${undefined}
    ${'Graz'}    | ${'Hamburg'}
    ${undefined} | ${'Hamburg'}
  `(
    'should search a flight from $from to $to',
    fakeAsync(({ from, to }: SearchFlightsQueryParams) => {
      const spectator = createComponent();
      const flightService = spectator.inject(FlightService);

      from && spectator.typeInElement(from, selectors.fromInput);
      to && spectator.typeInElement(to, selectors.toInput);

      // Debounce waits for 250ms so at first nothing happens
      expect(flightService.searchFlights).not.toHaveBeenCalled();

      tick(250);

      // After 250ms the call happens
      expect(flightService.searchFlights).toMatchSnapshot();
    })
  );

  it('should render a list of flights and show the amount found', fakeAsync(() => {
    const spectator = createComponent();
    const flightService = spectator.inject(FlightService);

    flightService.searchFlights.mockReturnValue(of(flights));
    spectator.typeInElement('Graz', selectors.fromInput);
    tick(250);
    spectator.detectChanges();

    expect(spectator.query(testIdSelector('content'))).toMatchSnapshot();
  }));
});
