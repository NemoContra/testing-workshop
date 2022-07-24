import { Injectable } from '@angular/core';
import {
  SearchFlightsQueryParams,
  Flight,
  FIND_FLIGHT_FROM,
  FIND_FLIGHT_TO,
} from '@testing-workshop/shared/util/api-interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../common/api-url';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private httpClient: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>(`${API_URL}/flight`);
  }

  searchFlights({
    from,
    to,
  }: Partial<SearchFlightsQueryParams>): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>(`${API_URL}/flight`, {
      params: new HttpParams({
        fromObject: {
          ...(from && { [FIND_FLIGHT_FROM]: from }),
          ...(to && { [FIND_FLIGHT_TO]: to }),
        },
      }),
    });
  }
}
