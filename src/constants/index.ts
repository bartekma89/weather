export enum City {
  WARSAW = "warszawa",
  CRACOW = "krakow",
  GDANSK = "gdansk",
  WROCLAW = "wroclaw",
}

export enum Routes {
  HOME = "/",
  CITY = "/city/:city",
  NO_MATCH = "*",
}

export const LANGUAGE = "pl";
export const UNIT = "metric";
export const celsiusSymbol = "°C";

export enum Forecast {
  MINUTELY = "minutely",
  HOURLY = "hourly",
  DAILY = "daily",
}
