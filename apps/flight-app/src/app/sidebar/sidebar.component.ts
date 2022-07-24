import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'flight-sidebar',
  templateUrl: 'sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
