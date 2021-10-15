import { axios } from "../services";
import { CityWeatherData } from "../types";

type CalculationParams = {
  mainCityValue: number;
  cityValue: number;
  precision?: number;
};

export const getCity = (city: string) =>
  axios.get<CityWeatherData>(
    `weather?q=${city}&lang=pl&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  );

export const calculateAmplitude = ({
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
}: {
  type: "temperature" | "windy" | "humidity" | "pressure";
  mainCityValue: number;
  cityValue: number;
  precision?: number;
  calculatedValue: ({
    mainCityValue,
    cityValue,
    precision,
  }: CalculationParams) => number;
}): string => {
  switch (type) {
    case "temperature":
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
    case "windy":
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
    case "humidity":
      console.log("humidity", mainCityValue, cityValue);
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
    case "pressure":
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
