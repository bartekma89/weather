import { Dispatch } from "redux";
import { getCityForecast } from "../helpers";

import {
  CityForecastAction,
  CityForecastData,
  CityForecastPendingAction,
  CityForecastRejectedAction,
  CityForecastResolvedAction,
  Error as _Error,
  ErrorType,
} from "../types";

const cityForecastPending = (): CityForecastPendingAction => ({
  type: CityForecastAction.PENDING,
});

const cityForecastResolve = (
  data: CityForecastData
): CityForecastResolvedAction => ({
  type: CityForecastAction.RESOLVED,
  payload: data,
});

const cityForecastReject = (error: _Error): CityForecastRejectedAction => ({
  type: CityForecastAction.REJECTED,
  payload: error,
});

export const fetchCityForecastData =
  (lat: number, lon: number) => async (dispatch: Dispatch) => {
    dispatch(cityForecastPending());

    try {
      const { data } = await getCityForecast(lat, lon);
      dispatch(cityForecastResolve(data));
    } catch (_error) {
      const error = _error as ErrorType;
      dispatch(cityForecastReject(error.message));
      throw new Error(error.message);
    }
  };
