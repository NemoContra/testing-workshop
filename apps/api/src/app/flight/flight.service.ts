import { Injectable } from '@nestjs/common';
import {
  FindSearchQueryParams,
  Flight,
} from '@testing-workshop/shared/util/api-interfaces';
import { flights } from './data/flights';

const findOptional = (item: string, optional?: string): boolean =>
  !optional || optional.toLowerCase().includes(item.toLowerCase());

@Injectable()
export class FlightService {
  getFlights({ from, to }: Partial<FindSearchQueryParams>): Flight[] {
    return flights
      .filter((flight: Flight) => findOptional(flight.from, from))
      .filter((flight: Flight) => findOptional(flight.to, to));
  }
}
