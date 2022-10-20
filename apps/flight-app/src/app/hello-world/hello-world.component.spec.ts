import { HelloWorldComponent } from './hello-world.component';
import { createHostFactory } from '@ngneat/spectator/jest';
import { YesNoPipe } from '@testing-workshop/client-shared/util/common';
import { testIdSelector } from '@testing-workshop/shared/util/test-helpers';

describe('HelloWorldComponent', () => {
  const createComponent = createHostFactory({
    component: HelloWorldComponent,
    imports: [YesNoPipe],
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
});
