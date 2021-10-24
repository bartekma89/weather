import { axios } from "../services";
import { CityForecastData, CityWeatherData, WeatherType } from "../types";
import { LANGUAGE, UNIT, Forecast, CELSIUS_SYMBOL } from "../constants";

// those types are using only in one place, this the reason, why they are not in types.ts file

type WeatherTypes =
  | WeatherType.HUMIDITY
  | WeatherType.TEMPERATURE
  | WeatherType.PRESSURE
  | WeatherType.WIND;

type CalculationParams = {
  mainCityValue: number;
  cityValue: number;
};

export type CalculatedValueType = ({
  mainCityValue,
  cityValue,
}: CalculationParams) => number;

type WeatherParametesType = {
  type: WeatherTypes;
  mainCityValue: number;
  cityValue: number;
  calculatedValue: CalculatedValueType;
};

const dayName = (date: Date, locale: string = LANGUAGE) =>
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

// method to fetch the weather in the city
export const getWeatherCity = (city: string) =>
  axios.get<CityWeatherData>(
    `weather?q=${city}&lang=${LANGUAGE}&units=${UNIT}&appid=${process.env.REACT_APP_API_KEY}`
  );

// method to fetch the forecast for the city
export const getCityForecast = (lat: number, lon: number) =>
  axios.get<CityForecastData>(
    `onecall?lat=${lat}&lon=${lon}&exclude=${Forecast.MINUTELY},${Forecast.HOURLY}&lang=${LANGUAGE}&units=${UNIT}&appid=${process.env.REACT_APP_API_KEY}`
  );

// method to calculate amplitude of temperature etc
export const calculateAmplitudeValue = ({
  mainCityValue,
  cityValue,
}: CalculationParams): number => {
  return Math.abs(Math.round(mainCityValue) - Math.round(cityValue));
};

// method to describe a weather
export const displayWeatherDescription = ({
  type,
  mainCityValue,
  cityValue,
  calculatedValue,
}: WeatherParametesType): string => {
  switch (type) {
    case WeatherType.TEMPERATURE:
      return mainCityValue >= cityValue
        ? `Temperatura jest wyższa o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}${CELSIUS_SYMBOL}`
        : `Temperatura jest niższa o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}${CELSIUS_SYMBOL}`;
    case WeatherType.WIND:
      return mainCityValue >= cityValue
        ? `Siła wiatru jest większa o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}m/s`
        : `Siła wiatru jest słabsza o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}m/s`;
    case WeatherType.HUMIDITY:
      return mainCityValue >= cityValue
        ? `Wilgotność jest wyższa o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}%`
        : `Wilgotność jest niższa o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}%`;
    case WeatherType.PRESSURE:
      return mainCityValue >= cityValue
        ? `Ciśnienie jest wyższe o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}hPa`
        : `Cisnienie jest niższe o ${calculatedValue({
            mainCityValue,
            cityValue,
          })}hPa`;
    default:
      throw new Error();
  }
};
