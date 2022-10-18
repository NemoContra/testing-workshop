import { createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { FlightsComponent } from './flights.component';
import { ClientSharedUiFlightCardComponent } from '@testing-workshop/client-shared/ui/flight-card';
import { FlightService } from '../services/flight.service';
import { of } from 'rxjs';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ClientSharedUiFlightCardHarness } from '@testing-workshop/client-shared/ui/flight-card/testing';
import { flights } from '@testing-workshop/shared/util/mock-data';

describe('FlightsComponent', () => {
  const createComponent = createComponentFactory({
    component: FlightsComponent,
    imports: [ClientSharedUiFlightCardComponent],
    providers: [mockProvider(FlightService)],
    detectChanges: false,
  });

  it('should render one flight-card', async () => {
    const spectator = createComponent();
    const flightService = spectator.inject(FlightService);
    flightService.getFlights.mockReturnValue(of([flights[0]]));
    spectator.detectChanges();

    const loader = await TestbedHarnessEnvironment.loader(spectator.fixture);
    const flightCardHarness = await loader.getHarness(
      ClientSharedUiFlightCardHarness
    );

    expect(await flightCardHarness.getFlightFrom()).toEqual('Graz');
    expect(await flightCardHarness.getFlightTo()).toEqual('Mallorca');
    expect(await flightCardHarness.getFlightNo()).toEqual('1');
  });

  it('should render two flight-cards', async () => {
    const spectator = createComponent();
    const flightService = spectator.inject(FlightService);
    flightService.getFlights.mockReturnValue(of(flights));
    spectator.detectChanges();

    const loader = await TestbedHarnessEnvironment.loader(spectator.fixture);
    const flightCard1Harness = await loader.getHarness(
      ClientSharedUiFlightCardHarness.with({ flightNo: '1' })
    );
    expect(await flightCard1Harness.getFlightFrom()).toEqual('Graz');
    expect(await flightCard1Harness.getFlightTo()).toEqual('Mallorca');
    expect(await flightCard1Harness.getFlightNo()).toEqual('1');

    const flightCard2Harness = await loader.getHarness(
      ClientSharedUiFlightCardHarness.with({ flightNo: '2' })
    );
    expect(await flightCard2Harness.getFlightFrom()).toEqual('Graz');
    expect(await flightCard2Harness.getFlightTo()).toEqual('Hamburg');
    expect(await flightCard2Harness.getFlightNo()).toEqual('2');
  });
});
