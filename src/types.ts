export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export enum WeatherAction {
  PENDING_WEATHER = "weather/pending",
  RESOLVED_WEATHER = "weather/resolved",
  REJECTED_WEATHER = "weather/rejected",
}

export type WeatherActionsType =
  | WeatherPendingAction
  | WeatherRejectedAction
  | WeatherResolvedAction;

export interface WeatherPendingAction {
  type: WeatherAction.PENDING_WEATHER;
}

export type Error = string;

export interface WeatherRejectedAction {
  type: WeatherAction.REJECTED_WEATHER;
  payload: Error;
}

export interface WeatherResolvedAction {
  type: WeatherAction.RESOLVED_WEATHER;
  payload: WeatherData;
}

export interface WeatherData {
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
