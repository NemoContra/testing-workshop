import { NgModule } from '@angular/core';
import { FlightsComponent } from './flights.component';
import { CommonModule } from '@angular/common';
import { ClientSharedUiFlightCardComponent } from '@testing-workshop/client-shared/ui/flight-card';

@NgModule({
  imports: [CommonModule, ClientSharedUiFlightCardComponent],
  declarations: [FlightsComponent],
  exports: [FlightsComponent],
})
export class FlightsModule {}
