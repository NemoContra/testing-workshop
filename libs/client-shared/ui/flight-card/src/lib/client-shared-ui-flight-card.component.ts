import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Flight } from '@testing-workshop/shared/util/api-interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'flight-card',
  templateUrl: './client-shared-ui-flight-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ClientSharedUiFlightCardComponent {
  @Input() flight?: Flight;

  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  select(): void {
    this.selected = true;
    this.selectedChange.next(true);
  }

  deselect(): void {
    this.selected = false;
    this.selectedChange.next(false);
  }
}
