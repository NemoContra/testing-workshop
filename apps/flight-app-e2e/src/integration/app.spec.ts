import { selectors } from '../support/app.po';

describe('flight-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.contains(selectors.home.greeting, 'Welcome to Flight-App');
  });
});
