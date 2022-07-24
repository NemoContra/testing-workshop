import { createRoutingFactory } from '@ngneat/spectator/jest';
import { AppComponent } from './app.component';
import { MockComponents } from 'ng-mocks';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { getQueryParam } from '@testing-workshop/client-shared/util/common';
import { of } from 'rxjs';
import { WINDOW } from '@ng-web-apis/common';

jest.mock('@testing-workshop/client-shared/util/common', () => {
  const { EMPTY } = jest.requireActual<typeof import('rxjs')>('rxjs');

  return {
    ...jest.requireActual('@testing-workshop/client-shared/util/common'),
    getQueryParam: jest.fn().mockReturnValue(EMPTY),
  };
});

describe('AppComponent', () => {
  const createComponent = createRoutingFactory({
    component: AppComponent,
    declarations: [MockComponents(SidebarComponent, NavbarComponent)],
    providers: [
      {
        provide: WINDOW,
        useFactory: () => ({
          alert: jest.fn(),
        }),
      },
    ],
    stubsEnabled: false,
  });

  afterEach(() => jest.clearAllMocks());

  it('should match snapshot', () => {
    const spectator = createComponent();
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should reveal the easteregg', () => {
    const getQueryParamMock = jest.mocked(getQueryParam);
    getQueryParamMock.mockReturnValue(of('true'));

    const spectator = createComponent();
    const window = spectator.inject(WINDOW);

    expect(getQueryParam).toHaveBeenCalledTimes(1);
    expect(getQueryParam).toHaveBeenCalledWith('easteregg');

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      'Congrats! You have found an easter egg!'
    );
  });

  it('should reveal the easteregg if queryParam is set but empty', () => {
    const getQueryParamMock = jest.mocked(getQueryParam);
    getQueryParamMock.mockReturnValue(of(''));

    const spectator = createComponent();
    const window = spectator.inject(WINDOW);

    expect(getQueryParam).toHaveBeenCalledTimes(1);
    expect(getQueryParam).toHaveBeenCalledWith('easteregg');

    expect(window.alert).not.toHaveBeenCalled();
  });
});
