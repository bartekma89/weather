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
export const CELSIUS_SYMBOL = "°C";
export const BASE_URL = "https://api.openweathermap.org/data/2.5";

export enum Forecast {
  MINUTELY = "minutely",
  HOURLY = "hourly",
  DAILY = "daily",
}
