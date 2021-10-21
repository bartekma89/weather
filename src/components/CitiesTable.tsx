import { useMemo } from "react";

import { CityWeatherData, WeatherType } from "../types";
import {
  calculateAmplitudeValue,
  getWeatherParameters,
  CalculatedValueType,
} from "../helpers";

interface ComponentProps {
  citiesWeather: CityWeatherData[];
  cityWeather: CityWeatherData;
}

type WeatherCityType = {
  id: number;
  type: WeatherType;
  mainCityValue: number;
  cityValue: number;
  calculatedValue: CalculatedValueType;
};

const CitiesTable = ({ citiesWeather, cityWeather }: ComponentProps) => {
  const weatherCitiesArray = useMemo(
    () =>
      (cityData: CityWeatherData): WeatherCityType[] =>
        [
          {
            id: cityData.id,
            type: WeatherType.TEMPERATURE,
            mainCityValue: cityWeather.main.temp,
            cityValue: cityData.main.temp,
            calculatedValue: calculateAmplitudeValue,
          },
          {
            id: cityData.id,
            type: WeatherType.HUMIDITY,
            mainCityValue: cityWeather.main.humidity,
            cityValue: cityData.main.humidity,
            calculatedValue: calculateAmplitudeValue,
          },
          {
            id: cityData.id,
            type: WeatherType.PRESSURE,
            mainCityValue: cityWeather.main.pressure,
            cityValue: cityData.main.pressure,
            calculatedValue: calculateAmplitudeValue,
          },
          {
            id: cityData.id,
            type: WeatherType.WIND,
            mainCityValue: cityWeather.wind.speed,
            cityValue: cityData.wind.speed,
            calculatedValue: calculateAmplitudeValue,
          },
        ],
    [
      cityWeather.main.humidity,
      cityWeather.main.pressure,
      cityWeather.main.temp,
      cityWeather.wind.speed,
    ]
  );

  return (
    <table>
      <tbody>
        <tr>
          {citiesWeather.map(({ id, weather, main }) => {
            return (
              <td key={`image_${id}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt="cloudy weather"
                    height="50"
                  />
                  <span style={{ fontSize: "36px" }}>
                    {Math.round(main.temp)}°C
                  </span>
                </div>
                <div>
                  {`Odczuwalna temperatura ${main.feels_like.toFixed(1)}°C. ${
                    weather[0].description
                  }`}
                </div>
              </td>
            );
          })}
        </tr>
        <tr>
          {citiesWeather.map(({ id, name, sys }) => {
            return (
              <td key={`name_${id}`}>
                <strong>
                  {name}, {sys.country}{" "}
                  <img
                    src={`http://openweathermap.org/images/flags/${sys.country.toLowerCase()}.png`}
                    alt="flag country"
                  />{" "}
                </strong>
              </td>
            );
          })}
        </tr>
        <tr>
          {citiesWeather.map((city) => {
            return (
              <td key={`weather_parameters_${city.id}`}>
                {weatherCitiesArray(city).map((cityData, idx) => {
                  return (
                    <p key={`${idx}_${cityData.id}`}>
                      {getWeatherParameters(cityData)}
                    </p>
                  );
                })}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default CitiesTable;
