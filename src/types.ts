export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export type Error = string | null;

export enum WeatherType {
  TEMPERATURE = "temperature",
  WIND = "wind",
  HUMIDITY = "humidity",
  PRESSURE = "pressure",
}

// city actions
export enum CityWeatherAction {
  PENDING = "city/weather/pending",
  RESOLVED = "city/weather/resolved",
  REJECTED = "city/weather/rejected",
}

export type CityWeatherActionsType =
  | CityWeatherPendingAction
  | CityWeatherRejectedAction
  | CityWeatherResolvedAction;

export interface CityWeatherPendingAction {
  type: CityWeatherAction.PENDING;
}

export interface CityWeatherRejectedAction {
  type: CityWeatherAction.REJECTED;
  payload: Error;
}

export interface CityWeatherResolvedAction {
  type: CityWeatherAction.RESOLVED;
  payload: CityWeatherData;
}

export interface CityWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// cities
export enum CitiesWeatherAction {
  PENDING = "cities/weather/pending",
  RESOLVED = "cities/weather/resolved",
  REJECTED = "cities/weather/rejected",
}

export type CitiesWeatherActionsType =
  | CitiesWeatherPendingAction
  | CitiesWeatherRejectedAction
  | CitiesWeatherResolvedAction;

export interface CitiesWeatherPendingAction {
  type: CitiesWeatherAction.PENDING;
}

export interface CitiesWeatherRejectedAction {
  type: CitiesWeatherAction.REJECTED;
  payload: Error;
}

export interface CitiesWeatherResolvedAction {
  type: CitiesWeatherAction.RESOLVED;
  payload: CityWeatherData[];
}
