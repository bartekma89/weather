import { RootState } from "../reducers";

export const cityWeatherDataSelector = (state: RootState) => state.city.data;
export const cityWeatherErrorSelector = (state: RootState) => state.city.error;
export const cityWeatherStatusSelector = (state: RootState) =>
  state.city.status;
