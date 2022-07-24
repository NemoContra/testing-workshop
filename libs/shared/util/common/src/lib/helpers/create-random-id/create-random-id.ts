import { v4 } from 'uuid';

export const createRandomId = (prefix: string, separator = '-') =>
  `${prefix}${separator}${v4()}`;
