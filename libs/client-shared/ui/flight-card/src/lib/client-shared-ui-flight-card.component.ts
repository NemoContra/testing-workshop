import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Flight } from '@testing-workshop/shared/util/api-interfaces';
import { CommonModule } from '@angular/common';
import { createRandomId } from '@testing-workshop/shared/util/common';
import { YesNoPipe } from '@testing-workshop/client-shared/util/common';

@Component({
  selector: 'flight-card',
  templateUrl: './client-shared-ui-flight-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, YesNoPipe],
})
export class ClientSharedUiFlightCardComponent {
  @Input() flight?: Flight;

  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  id = createRandomId('flight-card');

  select(): void {
    this.selected = true;
    this.selectedChange.next(true);
  }

  deselect(): void {
    this.selected = false;
    this.selectedChange.next(false);
  }
}
