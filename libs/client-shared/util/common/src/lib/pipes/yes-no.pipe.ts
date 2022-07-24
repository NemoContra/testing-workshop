import { Pipe, PipeTransform } from '@angular/core';

export type YesOrNo = 'yes' | 'no';

@Pipe({
  name: 'yesNo',
  standalone: true,
})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): YesOrNo {
    return value ? 'yes' : 'no';
  }
}
