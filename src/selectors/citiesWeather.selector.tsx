import { RootState } from "../reducers";

export const citiesWeatherDataSelector = (state: RootState) =>
  state.cities.data;
export const citiesWeatherErrorSelector = (state: RootState) =>
  state.cities.error;
export const citiesWeatherStatusSelector = (state: RootState) =>
  state.cities.status;
