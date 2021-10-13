import { Dispatch } from "redux";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";

import {
  WeatherAction,
  WeatherData,
  WeatherPendingAction,
  WeatherRejectedAction,
  WeatherResolvedAction,
  Error,
} from "../types";

const weatherPending = (): WeatherPendingAction => ({
  type: WeatherAction.PENDING_WEATHER,
});

const weatherResolve = (data: WeatherData): WeatherResolvedAction => ({
  type: WeatherAction.RESOLVED_WEATHER,
  payload: data,
});

const weatherReject = (error: Error): WeatherRejectedAction => ({
  type: WeatherAction.REJECTED_WEATHER,
  payload: error,
});

const http = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: {
    "content-type": "application/json",
  },
});

export const fetchWeatherData = (city: string) => (dispatch: Dispatch) => {
  dispatch(weatherPending());

  http
    .get<WeatherData>(
      `weather?q=${city}&lang=pl&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
    .then((data: AxiosResponse<WeatherData>) => {
      console.log(data);
      dispatch(weatherResolve(data.data));
    })
    .catch((error: AxiosError<Error>) => {
      dispatch(weatherReject(error.message));
    });
};
