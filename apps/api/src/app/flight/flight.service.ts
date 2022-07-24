import { Injectable } from '@nestjs/common';
import {
  SearchFlightsQueryParams,
  Flight,
} from '@testing-workshop/shared/util/api-interfaces';
import { flights } from './data/flights';

const findOptional = (item: string, optional?: string): boolean =>
  !optional || item.toLowerCase().includes(optional.toLowerCase());

@Injectable()
export class FlightService {
  getFlights({ from, to }: Partial<SearchFlightsQueryParams>): Flight[] {
    return flights
      .filter((flight: Flight) => findOptional(flight.from, from))
      .filter((flight: Flight) => findOptional(flight.to, to));
  }
}
