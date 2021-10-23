import { Dispatch } from "redux";

import { getWeatherCity } from "../helpers";

import {
  CityWeatherAction,
  CityWeatherData,
  CityWeatherPendingAction,
  CityWeatherRejectedAction,
  CityWeatherResolvedAction,
  Error as _Error,
  ErrorType,
} from "../types";

const cityWeatherPending = (): CityWeatherPendingAction => ({
  type: CityWeatherAction.PENDING,
});

const cityWeatherResolve = (
  data: CityWeatherData
): CityWeatherResolvedAction => ({
  type: CityWeatherAction.RESOLVED,
  payload: data,
});

const cityWeatherReject = (error: _Error): CityWeatherRejectedAction => ({
  type: CityWeatherAction.REJECTED,
  payload: error,
});

export const fetchCityWeatherData =
  (city: string) => async (dispatch: Dispatch) => {
    dispatch(cityWeatherPending());

    try {
      const { data } = await getWeatherCity(city);
      dispatch(cityWeatherResolve(data));
    } catch (_error) {
      const error = _error as ErrorType;
      dispatch(cityWeatherReject(error.message));
      throw new Error(error.message);
    }
  };
