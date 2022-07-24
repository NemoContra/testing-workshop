import { NavbarComponent } from './navbar.component';
import { createHostFactory } from '@ngneat/spectator/jest';
import { testIdSelector } from '@testing-workshop/shared/util/test-helpers';

describe('NavbarComponent', () => {
  const createComponent = createHostFactory(NavbarComponent);

  const selectors = {
    navbarToggle: testIdSelector('navbar-toggle'),
  } as const;

  it('should match snapshot', () => {
    const spectator = createComponent(`<flight-navbar></flight-navbar>`);
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should open and close the sidebar', () => {
    const spectator = createComponent(`<flight-navbar></flight-navbar>`);

    // Toggle the sidebar open
    spectator.click(selectors.navbarToggle);
    spectator.detectChanges();
    const body = spectator.query('body', { root: true });
    expect(body?.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "nav-open",
      }
    `);

    // Toggle the sidebar closed
    spectator.click(selectors.navbarToggle);
    spectator.detectChanges();
    expect(body?.classList).toMatchInlineSnapshot(`DOMTokenList {}`);
  });
});
