import { MountConfig } from 'cypress/angular';
import { ClientSharedUiFlightCardComponent } from './client-shared-ui-flight-card.component';

import { flights } from '@testing-workshop/shared/util/mock-data';
import { YesNoPipe } from '@testing-workshop/client-shared/util/common';

describe(ClientSharedUiFlightCardComponent.name, () => {
  const config: MountConfig<ClientSharedUiFlightCardComponent> = {
    declarations: [],
    imports: [YesNoPipe],
    providers: [],
  };

  it('should render a selected card', () => {
    cy.mount(ClientSharedUiFlightCardComponent, {
      ...config,
      componentProperties: {
        selected: true,
        flight: { ...flights[0] },
      },
    });

    cy.getByTestId('flight-card').should(
      'have.css',
      'background-color',
      'rgb(204, 197, 185)'
    );
  });
});
