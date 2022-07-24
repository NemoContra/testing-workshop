import { filter } from 'rxjs/operators';
import { OperatorFunction, TruthyTypesOf } from 'rxjs';

export const skipFalsy = <T>(): OperatorFunction<T, TruthyTypesOf<T>> =>
  filter(Boolean);
