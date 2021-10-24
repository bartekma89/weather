import { useMemo } from "react";
import { Table } from "reactstrap";

import { CELSIUS_SYMBOL } from "../constants";
import { CityWeatherData, WeatherType } from "../types";
import {
  calculateAmplitudeValue,
  displayWeatherDescription,
  CalculatedValueType,
  capitalize,
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
    <Table responsive bordered>
      <tbody>
        <tr>
          {citiesWeather.map(({ id, weather, main }) => (
            <td key={`image_${id}`}>
              <div className="d-flex flex-row flex-nowrap">
                <img
                  src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                  alt="cloudy weather"
                  height="50"
                />
                <span style={{ fontSize: "36px" }}>
                  {Math.round(main.temp)}
                  {CELSIUS_SYMBOL}
                </span>
              </div>
              <div>
                {`Odczuwalna temperatura ${main.feels_like.toFixed(
                  1
                )}${CELSIUS_SYMBOL}. ${capitalize(weather[0].description)}`}
              </div>
            </td>
          ))}
        </tr>
        <tr>
          {citiesWeather.map(({ id, name, sys }) => (
            <td key={`name_${id}`}>
              <strong>
                <span className="me-2 fs-5">
                  {name}, {sys.country}
                </span>{" "}
                <img
                  src={`http://openweathermap.org/images/flags/${sys.country.toLowerCase()}.png`}
                  alt="flag country"
                  height="15"
                />
              </strong>
            </td>
          ))}
        </tr>
        <tr>
          {citiesWeather.map((city) => (
            <td key={`weather_parameters_${city.id}`}>
              {weatherCitiesArray(city).map((cityData, idx) => (
                <p key={`${idx}_${cityData.id}`}>
                  {displayWeatherDescription(cityData)}
                </p>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
};

export default CitiesTable;
