import { Observer } from 'rxjs';

export const createSpyObserver = <T>(name = ''): Observer<T> => ({
  next: jest.fn().mockName(`next ${name}`.trim()),
  error: jest.fn().mockName(`error ${name}`.trim()),
  complete: jest.fn().mockName(`complete ${name}`.trim()),
});
