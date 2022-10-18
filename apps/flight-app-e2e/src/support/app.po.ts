import { testIdSelector } from '@testing-workshop/shared/util/test-helpers';

export const selectors = {
  home: {
    greeting: testIdSelector('home-greeting'),
  },
  allFlights: {
    cardTitle: testIdSelector('card-title'),
    content: testIdSelector('content'),
  },
  searchFlights: {
    inputFrom: testIdSelector('from'),
    inputTo: testIdSelector('to'),
  },
  flightCard: {
    card: testIdSelector('flight-card'),
    selectButton: testIdSelector('select-button'),
    deselectButton: testIdSelector('deselect-button'),
    from: testIdSelector('flight-from'),
    to: testIdSelector('flight-to'),
    date: testIdSelector('flight-date'),
    delayed: testIdSelector('flight-delayed'),
  },
} as const;

export const getFlightCards = () =>
  cy.get(selectors.allFlights.content).find(selectors.flightCard.card);

export const getFirstFlightCard = () => getFlightCards().first();
export const getSecondFlightCard = () => getFlightCards().eq(1);
