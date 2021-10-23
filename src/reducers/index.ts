import { combineReducers } from "redux";

import {
  cityWeatherReducer,
  InitialState as CityWeatherState,
} from "./cityWeather.reducer";
import {
  citiesWeatherReducer,
  InitialState as CitiesWeatherState,
} from "./citiesWeather.reducer";
import {
  cityForecastReducer,
  InitialState as CityForecastState,
} from "./cityForecast.reducer";

interface AppState {
  cityWeather: CityWeatherState;
  citiesWeather: CitiesWeatherState;
  cityForecast: CityForecastState;
}

export const rootReducer = combineReducers<AppState>({
  cityWeather: cityWeatherReducer,
  citiesWeather: citiesWeatherReducer,
  cityForecast: cityForecastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
