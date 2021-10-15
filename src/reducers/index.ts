import { combineReducers } from "redux";

import {
  cityWeatherReducer,
  InitialState as CityWeatherState,
} from "./cityWeather.reducer";

import {
  citiesWeatherReducer,
  InitialState as CitiesWeatherState,
} from "./citiesWeather.reducer";

interface AppState {
  city: CityWeatherState;
  cities: CitiesWeatherState;
}

export const rootReducer = combineReducers<AppState>({
  city: cityWeatherReducer,
  cities: citiesWeatherReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
