import { Module } from '@nestjs/common';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [FlightModule],
})
export class AppModule {}
