import { RootState } from "../reducers";

export const citiesWeatherDataSelector = ({ cities }: RootState) => cities.data;
export const citiesWeatherErrorSelector = ({ cities }: RootState) =>
  cities.error;
export const citiesWeatherStatusSelector = ({ cities }: RootState) =>
  cities.status;
