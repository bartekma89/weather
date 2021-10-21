import { RootState } from "../reducers";

export const cityWeatherDataSelector = ({ city }: RootState) => city.data;
export const cityWeatherErrorSelector = ({ city }: RootState) => city.error;
export const cityWeatherStatusSelector = ({ city }: RootState) => city.status;
