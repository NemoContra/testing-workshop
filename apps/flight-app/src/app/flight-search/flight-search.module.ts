import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSharedUiFlightCardComponent } from '@testing-workshop/client-shared/ui/flight-card';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientSharedUiFlightCardComponent,
  ],
  declarations: [FlightSearchComponent],
  exports: [FlightSearchComponent],
})
export class FlightSearchModule {}
