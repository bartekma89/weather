import { RootState } from "../reducers";

export const cityForecastDataSelector = ({ cityForecast }: RootState) =>
  cityForecast.data;
export const cityForecastErrorSelector = ({ cityForecast }: RootState) =>
  cityForecast.error;
export const cityForecastStatusSelector = ({ cityForecast }: RootState) =>
  cityForecast.status;
