export enum Status {
  IDLE = "idle",
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export type ErrorType = {
  message: string;
  name: string;
  stack: string;
  status: number;
};

export type Error = string | null;

export enum WeatherType {
  TEMPERATURE = "temperature",
  WIND = "wind",
  HUMIDITY = "humidity",
  PRESSURE = "pressure",
}

// forecast

export interface CityForecastData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
    minutely?: [
      {
        dt: number;
        precipitation: number;
      }
    ];
    hourly?: [
      {
        dt: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust: number;
        weather: Weather[];
        pop: number;
      }
    ];
    daily?: [
      {
        dt: number;
        sunrise: number;
        sunset: number;
        moonrise: number;
        moonset: number;
        moon_phase: number;
        temp: {
          day: number;
          min: number;
          max: number;
          night: number;
          eve: number;
          morn: number;
        };
        feels_like: {
          day: number;
          night: number;
          eve: number;
          morn: number;
        };
        pressure: number;
        humidity: number;
        dew_point: number;
        wind_speed: number;
        wind_deg: number;
        weather: Weather[];
        clouds: number;
        pop: number;
        rain: number;
        uvi: number;
      }
    ];
  };
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export enum CityForecastAction {
  PENDING = "city/forecast/pending",
  RESOLVED = "city/forecast/resolved",
  REJECTED = "city/forecast/rejected",
}

export type CityForecastActionsType =
  | CityForecastPendingAction
  | CityForecastRejectedAction
  | CityForecastResolvedAction;

export interface CityForecastPendingAction {
  type: CityForecastAction.PENDING;
}

export interface CityForecastRejectedAction {
  type: CityForecastAction.REJECTED;
  payload: Error;
}

export interface CityForecastResolvedAction {
  type: CityForecastAction.RESOLVED;
  payload: CityForecastData;
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
