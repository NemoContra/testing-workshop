import {
  getFirstFlightCard,
  getFlightCards,
  getSecondFlightCard,
  selectors,
} from '../support/app.po';
import { flights } from '@testing-workshop/shared/util/mock-data';

const {
  allFlights: { cardTitle },
  flightCard: { from, to, date, delayed, selectButton, deselectButton },
} = selectors;

describe('AllFlights', () => {
  beforeEach(() => {
    cy.intercept('/api/flight', flights).as('flights');
    cy.visit('/flights');
  });

  it('should display welcome card title', () => {
    cy.contains(cardTitle, 'All Flights');
    cy.wait('@flights');
    getFlightCards().should('have.length', 2);
  });

  it('should match the correct cards', () => {
    getFirstFlightCard().find(from).contains('Graz');
    getFirstFlightCard().find(to).contains('Mallorca');
    getFirstFlightCard().find(date).contains('October 15');
    getFirstFlightCard().find(delayed).contains('no');

    getSecondFlightCard().find(from).contains('Graz');
    getSecondFlightCard().find(to).contains('Hamburg');
    getSecondFlightCard().find(date).contains('October 12, 2020');
    getSecondFlightCard().find(delayed).contains('no');
  });

  it('should select and deselect a card', () => {
    getFirstFlightCard().should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );

    getFirstFlightCard().find(selectButton).click();
    getFirstFlightCard().should(
      'have.css',
      'background-color',
      'rgb(204, 197, 185)'
    );

    getFirstFlightCard().find(deselectButton).click();
    getFirstFlightCard().should(
      'have.css',
      'background-color',
      'rgb(255, 255, 255)'
    );
  });
});
