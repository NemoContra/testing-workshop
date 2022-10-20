import { Directive, HostBinding } from '@angular/core';
import { v4 } from 'uuid';

@Directive({
  selector: '[flightColorRed]',
  standalone: true,
})
export class ColorRedDirective {
  @HostBinding('style') style = {
    color: 'red',
  };

  @HostBinding('attr.data-automationid') automationId = v4();
}
