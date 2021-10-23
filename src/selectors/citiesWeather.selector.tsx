import { RootState } from "../reducers";

export const citiesWeatherDataSelector = ({ citiesWeather }: RootState) =>
  citiesWeather.data;
export const citiesWeatherErrorSelector = ({ citiesWeather }: RootState) =>
  citiesWeather.error;
export const citiesWeatherStatusSelector = ({ citiesWeather }: RootState) =>
  citiesWeather.status;
