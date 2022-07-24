import { Component, Input } from '@angular/core';
import { Flight } from '@testing-workshop/shared/util/api-interfaces';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { ClientSharedUiFlightCardComponent } from '../../../src/lib/client-shared-ui-flight-card.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ClientSharedUiFlightCardHarness } from './flight-card.harness';

@Component({
  template: `<flight-card
    [flight]="flight"
    [selected]="selected"
  ></flight-card>`,
})
class TestComponent {
  @Input()
  flight: Flight = {
    id: 1,
    from: 'Graz',
    to: 'Mallorca',
    date: '2020-10-15T06:22:52.4208588+00:00',
    delayed: false,
  };

  @Input()
  selected = false;
}

describe('FlightCardHarness', () => {
  const createComponent = createComponentFactory({
    component: TestComponent,
    imports: [ClientSharedUiFlightCardComponent],
  });

  it('should read the flight-card via the harness', async () => {
    const spectator = createComponent();

    const loader = await TestbedHarnessEnvironment.loader(spectator.fixture);
    const flightCardHarness = await loader.getHarness(
      ClientSharedUiFlightCardHarness
    );

    expect(await flightCardHarness.getText()).toEqual(
      'Graz - Mallorca Flight-No.: #1 Date: October 15, 2020 at 6:22:52 AM GMT+0 Delayed: no Select'
    );
    expect(await flightCardHarness.getHeaderText()).toEqual('Graz - Mallorca');
    expect(await flightCardHarness.getFlightFrom()).toEqual('Graz');
    expect(await flightCardHarness.getFlightTo()).toEqual('Mallorca');
    expect(await flightCardHarness.getFlightNo()).toEqual('1');
    expect(await flightCardHarness.getFlightDate()).toEqual(
      'October 15, 2020 at 6:22:52 AM GMT+0'
    );
    expect(await flightCardHarness.getFlightDelayed()).toEqual(false);
    expect(await flightCardHarness.isSelected()).toBe(false);
  });

  it('should toggle the card selected and deselected', async () => {
    const spectator = createComponent();

    const loader = await TestbedHarnessEnvironment.loader(spectator.fixture);
    const flightCardHarness = await loader.getHarness(
      ClientSharedUiFlightCardHarness
    );

    await flightCardHarness.select();
    expect(await flightCardHarness.isSelected()).toBe(true);
    await flightCardHarness.select();
    expect(await flightCardHarness.isSelected()).toBe(true);

    await flightCardHarness.deselect();
    expect(await flightCardHarness.isSelected()).toBe(false);
    await flightCardHarness.deselect();
    expect(await flightCardHarness.isSelected()).toBe(false);
  });

  it('should get the card by flightNo', async () => {
    const spectator = createComponent();

    const loader = await TestbedHarnessEnvironment.loader(spectator.fixture);
    const flightCardHarness = await loader.getHarness(
      ClientSharedUiFlightCardHarness.with({
        flightNo: '1',
      })
    );

    expect(await flightCardHarness.getFlightFrom()).toEqual('Graz');
    expect(await flightCardHarness.getFlightTo()).toEqual('Mallorca');
  });

  it('should get the card by flightFrom', async () => {
    const spectator = createComponent();

    const loader = await TestbedHarnessEnvironment.loader(spectator.fixture);
    const flightCardHarness = await loader.getHarness(
      ClientSharedUiFlightCardHarness.with({
        flightFrom: 'Graz',
      })
    );

    expect(await flightCardHarness.getFlightFrom()).toEqual('Graz');
    expect(await flightCardHarness.getFlightTo()).toEqual('Mallorca');
  });

  it('should get the card by flightTo', async () => {
    const spectator = createComponent();

    const loader = await TestbedHarnessEnvironment.loader(spectator.fixture);
    const flightCardHarness = await loader.getHarness(
      ClientSharedUiFlightCardHarness.with({
        flightTo: 'Mallorca',
      })
    );

    expect(await flightCardHarness.getFlightFrom()).toEqual('Graz');
    expect(await flightCardHarness.getFlightTo()).toEqual('Mallorca');
  });
});
