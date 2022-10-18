import { createHostFactory } from '@ngneat/spectator/jest';
import { ClientSharedUiFlightCardComponent } from './client-shared-ui-flight-card.component';
import {
  createSpyObserver,
  testIdSelector,
} from '@testing-workshop/shared/util/test-helpers';
import { flights } from '@testing-workshop/shared/util/mock-data';

jest.mock('@testing-workshop/shared/util/common', () => ({
  ...jest.requireActual('@testing-workshop/shared/util/common'),
  createRandomId: jest.fn(
    (prefix) => `${prefix}-c1bfb6ed-5503-4549-8914-686553a408e1`
  ),
}));

describe('ClientSharedUiFlightCardComponent', () => {
  const createComponent = createHostFactory(ClientSharedUiFlightCardComponent);

  const selectors = {
    selectButton: testIdSelector('select-button'),
    deselectButton: testIdSelector('deselect-button'),
  } as const;

  it.each`
    flight        | selected
    ${flights[0]} | ${true}
    ${flights[0]} | ${false}
    ${flights[1]} | ${true}
    ${flights[1]} | ${false}
  `(
    'should render card with flight from $flight.from to $flight.to and selected: $selected',
    ({ flight, selected }) => {
      const spectator = createComponent(`<flight-card></flight-card>`, {
        props: {
          flight,
          selected,
        },
      });

      expect(spectator.fixture).toMatchSnapshot();
    }
  );

  it('should select and deselect a card', () => {
    const spectator = createComponent(`<flight-card></flight-card>`, {
      props: {
        flight: flights[0],
        selected: false,
      },
    });

    const spyObserver = createSpyObserver();
    spectator.output('selectedChange').subscribe(spyObserver);

    spectator.click(selectors.selectButton);
    expect(spectator.fixture).toMatchSnapshot('selected');

    spectator.click(selectors.deselectButton);
    expect(spectator.fixture).toMatchSnapshot('deselected');

    expect(spyObserver).toMatchSnapshot('selectedChange');
  });
});
