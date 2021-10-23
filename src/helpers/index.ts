import { axios } from "../services";
import { CityForecastData, CityWeatherData, WeatherType } from "../types";
import { LANGUAGE, UNIT, Forecast, celsiusSymbol } from "../constants";

type WeatherTypes =
  | WeatherType.HUMIDITY
  | WeatherType.TEMPERATURE
  | WeatherType.PRESSURE
  | WeatherType.WIND;

type CalculationParams = {
  mainCityValue: number;
  cityValue: number;
  precision?: number;
};

export type CalculatedValueType = ({
  mainCityValue,
  cityValue,
  precision,
}: CalculationParams) => number;

type WeatherParametesType = {
  type: WeatherTypes;
  mainCityValue: number;
  cityValue: number;
  precision?: number;
  calculatedValue: CalculatedValueType;
};

const dayName = (date: Date, locale: string = "pl") =>
  date.toLocaleDateString(locale, { weekday: "short" });

export const getFormatDate = (timestamp: number, locale: string = "pl") => {
  const date = new Date(timestamp);
  const day = dayName(date);
  return `${day.toUpperCase()}, ${date
    .toLocaleDateString(locale, { month: "short" })
    .toUpperCase()} ${date.getDate()}`;
};

export const capitalize = (value: string) => {
  const [first, ...rest]: string[] = value.split("");
  return `${first.toUpperCase()}${rest.join("")}`;
};

export const getWeatherCity = (city: string) =>
  axios.get<CityWeatherData>(
    `weather?q=${city}&lang=${LANGUAGE}&units=${UNIT}&appid=${process.env.REACT_APP_API_KEY}`
  );

export const getCityForecast = (lat: number, lon: number) =>
  axios.get<CityForecastData>(
    `onecall?lat=${lat}&lon=${lon}&exclude=${Forecast.MINUTELY},${Forecast.HOURLY}&lang=${LANGUAGE}&units=${UNIT}&appid=${process.env.REACT_APP_API_KEY}`
  );

export const calculateAmplitudeValue = ({
  mainCityValue,
  cityValue,
  precision = 0,
}: CalculationParams): number => {
  return Math.abs(Math.round(mainCityValue) - Math.round(cityValue));
};

export const getWeatherParameters = ({
  type,
  mainCityValue,
  cityValue,
  calculatedValue,
  precision,
}: WeatherParametesType): string => {
  switch (type) {
    case WeatherType.TEMPERATURE:
      return mainCityValue >= cityValue
        ? `Temperatura jest wyższa o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}${celsiusSymbol}`
        : `Temperatura jest niższa o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}${celsiusSymbol}`;
    case WeatherType.WIND:
      return mainCityValue >= cityValue
        ? `Siła wiatru jest większa o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}m/s`
        : `Siła wiatru jest słabsza o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}m/s`;
    case WeatherType.HUMIDITY:
      return mainCityValue >= cityValue
        ? `Wilgotność jest wyższa o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}%`
        : `Wilgotność jest niższa o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}%`;
    case WeatherType.PRESSURE:
      return mainCityValue >= cityValue
        ? `Ciśnienie jest wyższe o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}hPa`
        : `Cisnienie jest niższe o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}hPa`;
    default:
      throw new Error();
  }
};
