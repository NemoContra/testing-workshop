import { createPipeFactory } from '@ngneat/spectator/jest';
import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  const createPipe = createPipeFactory(YesNoPipe);

  it('should return yes for true', () => {
    const spectator = createPipe(`<span>{{ true | yesNo }}</span>`);
    expect(spectator.fixture).toMatchSnapshot();
  });

  it('should return no for false', () => {
    const spectator = createPipe(`<span>{{ false | yesNo }}</span>`);
    expect(spectator.fixture).toMatchSnapshot();
  });
});
