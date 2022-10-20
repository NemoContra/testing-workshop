import { HelloWorldComponent } from './hello-world.component';
import { createHostFactory, mockProvider } from '@ngneat/spectator/jest';
import { YesNoPipe } from '@testing-workshop/client-shared/util/common';
import { testIdSelector } from '@testing-workshop/shared/util/test-helpers';
import { CalculatorService } from '../services/calculator.service';
import { Subject } from 'rxjs';
import spyOn = jest.spyOn;

describe('HelloWorldComponent', () => {
  let calculate$: Subject<number>;

  const createComponent = createHostFactory({
    component: HelloWorldComponent,
    imports: [YesNoPipe],
    providers: [
      mockProvider(CalculatorService, {
        add: jest.fn().mockReturnValue((calculate$ = new Subject<number>())),
      }),
    ],
  });

  it('should render "hello world"!', () => {
    const spectator = createComponent(
      `<flight-hello-world></flight-hello-world>`
    );
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should render "hello Lohr"!', () => {
    const spectator = createComponent(
      `<flight-hello-world name="Lohr"></flight-hello-world>`
    );
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should not be fine', () => {
    const spectator = createComponent(
      `<flight-hello-world name="Lohr" [isFine]="false"></flight-hello-world>`
    );

    const fine = spectator.query(testIdSelector('fine'));

    expect(fine).toMatchInlineSnapshot(`
      <p
        data-tid="fine"
      >
        I am fine: no
      </p>
    `);
  });

  it('should log 1', () => {
    spyOn(console, 'log').mockImplementation();
    createComponent(`<flight-hello-world></flight-hello-world>`);
    calculate$.next(10);
    calculate$.next(20);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(10);
  });
});
