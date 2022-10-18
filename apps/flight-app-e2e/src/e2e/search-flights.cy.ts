import { getFlightCards, selectors } from '../support/app.po';
import { flights } from '@testing-workshop/shared/util/mock-data';

const {
  searchFlights: { inputFrom, inputTo },
} = selectors;

describe('SearchFlights', () => {
  beforeEach(() => {
    cy.intercept({ pathname: '/api/flight', query: { from: 'Graz' } }, flights);
    cy.intercept(
      { pathname: '/api/flight', query: { from: 'Graz', to: 'Hamburg' } },
      flights
    ).as('flights');

    cy.visit('/flight-search');
  });

  it('should search for flights', () => {
    cy.get(inputFrom).type('Graz');
    cy.get(inputTo).type('Hamburg');

    cy.wait('@flights');
    getFlightCards().should('have.length', 2);
  });
});
