import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FindSearchQueryParams,
  Flight,
} from '@testing-workshop/shared/util/api-interfaces';
import { FlightService } from '../services/flight.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'flight-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent {
  flights$?: Observable<Flight[]>;

  flightsSearchFormGroup = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
  });

  constructor(private flightService: FlightService) {}

  findFlights(): void {
    const { from, to } = this.flightsSearchFormGroup
      .value as FindSearchQueryParams;
    this.flights$ = this.flightService.findFlight({ from, to });
  }
}
