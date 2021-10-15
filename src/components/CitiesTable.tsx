import { CityWeatherData } from "../types";
import { calculateAmplitude, getWeatherParameters } from "../helpers";

interface ComponentProps {
  citiesWeather: CityWeatherData[];
  cityWeather: CityWeatherData;
}

const CitiesTable = ({ citiesWeather, cityWeather }: ComponentProps) => {
  return (
    <table>
      <tbody>
        <tr>
          {citiesWeather.map((city) => {
            return (
              <td key={`image_${city.id}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    whiteSpace: "nowrap",
                  }}
                >
                  <img
                    src={`http://openweathermap.org/img/wn/${city?.weather[0].icon}@2x.png`}
                    alt="cloudy weather"
                    height="50"
                  />
                  <span style={{ fontSize: "36px" }}>
                    {Math.round(city.main.temp)}°C
                  </span>
                </div>
                <div>
                  {`Odczuwalna temperatura ${city.main.feels_like.toFixed(
                    1
                  )}°C. ${city.weather[0].description}`}
                </div>
              </td>
            );
          })}
        </tr>
        <tr>
          {citiesWeather.map((city) => {
            return (
              <td key={`name_${city.id}`}>
                <strong>
                  {city?.name}, {city?.sys.country}{" "}
                  <img
                    src={`http://openweathermap.org/images/flags/${city?.sys.country.toLowerCase()}.png`}
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
                <p>
                  {getWeatherParameters({
                    type: "temperature",
                    mainCityValue: cityWeather?.main.temp,
                    cityValue: city.main.temp,
                    calculatedValue: calculateAmplitude,
                  })}
                </p>
                <p>
                  {getWeatherParameters({
                    type: "humidity",
                    mainCityValue: cityWeather?.main.humidity,
                    cityValue: city.main.humidity,
                    calculatedValue: calculateAmplitude,
                  })}
                </p>
                <p>
                  {getWeatherParameters({
                    type: "pressure",
                    mainCityValue: cityWeather?.main.pressure,
                    cityValue: city.main.pressure,
                    calculatedValue: calculateAmplitude,
                  })}
                </p>
                <p>
                  {getWeatherParameters({
                    type: "windy",
                    mainCityValue: cityWeather?.wind.speed,
                    cityValue: city.wind.speed,
                    calculatedValue: calculateAmplitude,
                  })}
                </p>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default CitiesTable;
