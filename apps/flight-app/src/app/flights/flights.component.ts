import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { Observable } from 'rxjs';
import { Flight } from '@testing-workshop/shared/util/api-interfaces';

@Component({
  selector: 'flight-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsComponent implements OnInit {
  flights$?: Observable<Flight[]>;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.initFlights();
  }

  initFlights(): void {
    this.flights$ = this.flightService.getFlights();
  }
}
