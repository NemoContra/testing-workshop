export const FIND_FLIGHT_FROM = 'from' as const;
export const FIND_FLIGHT_TO = 'to' as const;

export type SearchFlightsQueryParamKeys =
  | typeof FIND_FLIGHT_FROM
  | typeof FIND_FLIGHT_TO;

export type SearchFlightsQueryParams = Record<
  SearchFlightsQueryParamKeys,
  string
>;
