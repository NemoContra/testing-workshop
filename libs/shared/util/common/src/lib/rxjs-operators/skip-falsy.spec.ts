import { Context, marbles } from 'rxjs-marbles';

import { skipFalsy } from './skip-falsy';

describe('skipFalsy', () => {
  it(
    'should not emit for null',
    marbles((m: Context) => {
      const stream$ = m
        .hot('abc', { a: null, b: 1, c: 'test' })
        .pipe(skipFalsy());
      m.expect(stream$).toBeObservable('-bc', { b: 1, c: 'test' });
    })
  );

  it(
    'should not emit for undefined',
    marbles((m: Context) => {
      const stream$ = m
        .hot('abc', { a: 1, b: undefined, c: 'test' })
        .pipe(skipFalsy());
      m.expect(stream$).toBeObservable('a-c', { a: 1, c: 'test' });
    })
  );

  it(
    'should not emit for false',
    marbles((m: Context) => {
      const stream$ = m
        .hot('abc', { a: 1, b: 'test', c: false })
        .pipe(skipFalsy());
      m.expect(stream$).toBeObservable('ab-', { a: 1, b: 'test' });
    })
  );

  it(
    'should not emit for 0',
    marbles((m: Context) => {
      const stream$ = m.hot('abc', { a: 0, b: 1, c: 'test' }).pipe(skipFalsy());
      m.expect(stream$).toBeObservable('-bc', { b: 1, c: 'test' });
    })
  );

  it(
    'should not emit for ""',
    marbles((m: Context) => {
      const stream$ = m
        .hot('abc', { a: '', b: 1, c: 'test' })
        .pipe(skipFalsy());
      m.expect(stream$).toBeObservable('-bc', { b: 1, c: 'test' });
    })
  );

  it(
    'should not emit for NaN',
    marbles((m: Context) => {
      const stream$ = m
        .hot('abc', { a: NaN, b: 1, c: 'test' })
        .pipe(skipFalsy());
      m.expect(stream$).toBeObservable('-bc', { b: 1, c: 'test' });
    })
  );
});
