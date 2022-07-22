import { Controller, Get, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import {
  FIND_FLIGHT_FROM,
  FIND_FLIGHT_TO,
  Flight,
} from '@testing-workshop/shared/util/api-interfaces';

@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @Get()
  getFlights(
    @Query(FIND_FLIGHT_FROM) from?: string,
    @Query(FIND_FLIGHT_TO) to?: string
  ): Flight[] {
    return this.flightService.getFlights({ from, to });
  }
}
