import { RootState } from "../reducers";

export const cityWeatherDataSelector = ({ cityWeather }: RootState) =>
  cityWeather.data;
export const cityWeatherErrorSelector = ({ cityWeather }: RootState) =>
  cityWeather.error;
export const cityWeatherStatusSelector = ({ cityWeather }: RootState) =>
  cityWeather.status;
