import { createDirectiveFactory } from '@ngneat/spectator/jest';
import { ColorRedDirective } from './color-red.directive';

describe('ColorRedDirective', () => {
  const createDirective = createDirectiveFactory(ColorRedDirective);

  it('should apply the correct style', () => {
    const spectator = createDirective(`<div flightColorRed></div>`);
    const div = spectator.query<HTMLDivElement>('div');
    expect(div).toMatchInlineSnapshot(`
      <div
        flightcolorred=""
        style="color: red;"
      />
    `);
  });
});
