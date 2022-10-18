import { SidebarComponent } from './sidebar.component';
import { createRoutingFactory } from '@ngneat/spectator/jest';
import { ROUTES } from '../app-routing.module';
import { MockComponents } from 'ng-mocks';
import { HomeComponent } from '../home/home.component';
import { FlightsComponent } from '../flights/flights.component';
import { FlightSearchComponent } from '../flight-search/flight-search.component';
import { Location } from '@angular/common';
import { testIdSelector } from '@testing-workshop/shared/util/test-helpers';

describe('SidebarComponent', () => {
  const createComponent = createRoutingFactory({
    component: SidebarComponent,
    routes: ROUTES,
    declarations: [
      MockComponents(HomeComponent, FlightsComponent, FlightSearchComponent),
    ],
    stubsEnabled: false,
  });

  const selectors = {
    home: testIdSelector('link-home'),
    flights: testIdSelector('link-flights'),
    flightSearch: testIdSelector('link-flight-search'),
  } as const;

  it('should match snapshot', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should navigate home, flights and flight-search', () => {
    const spectator = createComponent();
    const location = spectator.inject(Location);

    spectator.click(selectors.home);
    expect(location.path()).toMatchInlineSnapshot(`"/"`);

    spectator.click(selectors.flights);
    expect(location.path()).toMatchInlineSnapshot(`"/flights"`);

    spectator.click(selectors.flightSearch);
    expect(location.path()).toMatchInlineSnapshot(`"/flight-search"`);
  });
});
