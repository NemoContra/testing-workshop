import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import {
  Flight,
  SearchFlightsQueryParams,
} from '@testing-workshop/shared/util/api-interfaces';
import { FlightService } from '../services/flight.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'flight-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSearchComponent implements OnDestroy {
  private destroy$$ = new Subject<void>();

  searchFlightsFormGroup = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  });

  flights$: Observable<Flight[]> =
    this.searchFlightsFormGroup.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((searchFlightsQueryParams) =>
        this.searchFlights(searchFlightsQueryParams as SearchFlightsQueryParams)
      ),
      takeUntil(this.destroy$$)
    );

  constructor(private flightService: FlightService) {}

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  private searchFlights(
    searchFlightsQueryParams: SearchFlightsQueryParams
  ): Observable<Flight[]> {
    return this.flightService.searchFlights(searchFlightsQueryParams);
  }
}
