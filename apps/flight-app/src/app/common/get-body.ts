import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const getHTMLBodyElement = (): HTMLBodyElement =>
  inject(DOCUMENT).body as HTMLBodyElement;
