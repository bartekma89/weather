import { axios } from "../services";
import { CityWeatherData, WeatherType } from "../types";

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

export const getCity = (city: string) =>
  axios.get<CityWeatherData>(
    `weather?q=${city}&lang=pl&units=metric&appid=${process.env.REACT_APP_API_KEY}`
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
          })}°C`
        : `Temperatura jest niższa o ${calculatedValue({
            mainCityValue,
            cityValue,
            precision,
          })}°C`;
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
