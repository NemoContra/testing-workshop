export const FIND_FLIGHT_FROM = 'from' as const;
export const FIND_FLIGHT_TO = 'to' as const;

export type FlightSearchQueryParamKeys =
  | typeof FIND_FLIGHT_FROM
  | typeof FIND_FLIGHT_TO;

export type FindSearchQueryParams = Record<FlightSearchQueryParamKeys, string>;
