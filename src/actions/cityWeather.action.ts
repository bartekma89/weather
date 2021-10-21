import { Dispatch } from "redux";

import { getCity } from "../helpers";

import {
  CityWeatherAction,
  CityWeatherData,
  CityWeatherPendingAction,
  CityWeatherRejectedAction,
  CityWeatherResolvedAction,
  Error as _Error,
} from "../types";

type ErrorType = {
  message: string;
  name: string;
  stack: string;
  status: number;
};

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
      const { data } = await getCity(city);
      dispatch(cityWeatherResolve(data));
    } catch (_error) {
      const error = _error as ErrorType;
      dispatch(cityWeatherReject(error.message));
      throw new Error(error.message);
    }
  };
