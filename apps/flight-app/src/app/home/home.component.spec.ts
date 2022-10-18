import { createRoutingFactory } from '@ngneat/spectator/jest';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const createComponent = createRoutingFactory({
    component: HomeComponent,
    routes: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  });

  it('should match snapshot', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
