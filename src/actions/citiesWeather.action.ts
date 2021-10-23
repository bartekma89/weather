import { Dispatch } from "redux";

import { getWeatherCity } from "../helpers";
import { City } from "../constants";

import {
  CitiesWeatherAction,
  CityWeatherData,
  CitiesWeatherPendingAction,
  CitiesWeatherRejectedAction,
  CitiesWeatherResolvedAction,
  Error as _Error,
  ErrorType,
} from "../types";

const citiesWeatherPending = (): CitiesWeatherPendingAction => ({
  type: CitiesWeatherAction.PENDING,
});

const citiesWeatherResolve = (
  data: CityWeatherData[]
): CitiesWeatherResolvedAction => ({
  type: CitiesWeatherAction.RESOLVED,
  payload: data,
});

const citiesWeatherReject = (error: _Error): CitiesWeatherRejectedAction => ({
  type: CitiesWeatherAction.REJECTED,
  payload: error,
});

export const fetchCitiesWeatherData = () => async (dispatch: Dispatch) => {
  dispatch(citiesWeatherPending());

  Promise.all([
    getWeatherCity(City.CRACOW),
    getWeatherCity(City.GDANSK),
    getWeatherCity(City.WARSAW),
    getWeatherCity(City.WROCLAW),
  ])
    .then((cities) => {
      const data = cities.map(({ data }) => data);
      dispatch(citiesWeatherResolve(data));
    })
    .catch((_error) => {
      const error = _error as ErrorType;
      dispatch(citiesWeatherReject(error.message));
      throw new Error(error.message);
    });
};
