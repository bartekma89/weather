import { Dispatch } from "redux";

import { getCity } from "../helpers";
import { City } from "../constants/cities";

import {
  CitiesWeatherAction,
  CityWeatherData,
  CitiesWeatherPendingAction,
  CitiesWeatherRejectedAction,
  CitiesWeatherResolvedAction,
  Error as _Error,
} from "../types";

type ErrorType = {
  message: string;
  name: string;
  stack: string;
  status: number;
};

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
    getCity(City.CRACOW),
    getCity(City.GDANSK),
    getCity(City.WARSAW),
    getCity(City.WROCLAW),
  ])
    .then((cities) => {
      const data = cities.map((city) => city.data);
      dispatch(citiesWeatherResolve(data));
    })
    .catch((_error) => {
      const error = _error as ErrorType;
      dispatch(citiesWeatherReject(error.message));
      throw new Error(error.message);
    });
};
