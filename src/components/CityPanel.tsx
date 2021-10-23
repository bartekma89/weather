import { Card, CardBody, CardText, CardTitle } from "reactstrap";

import { CityWeatherData } from "../types";
import { capitalize } from "../helpers";
import { celsiusSymbol } from "../constants";

interface ComponentProps {
  cityWeather: CityWeatherData;
}

const CityPanel = ({ cityWeather }: ComponentProps) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <strong>
            <span className="me-2 fs-5">
              {cityWeather.name}, {cityWeather.sys.country}
            </span>{" "}
            <span>
              <img
                src={`http://openweathermap.org/images/flags/${cityWeather.sys.country.toLowerCase()}.png`}
                alt="country flag"
                height="15"
              />
            </span>
          </strong>
        </CardTitle>
        <div className="d-flex flex-row flex-nowrap my-2">
          <img
            src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
            alt="cloudy weather"
            height="50"
          />
          <span className="fs-2">
            {Math.round(cityWeather.main.temp)}
            {celsiusSymbol}
          </span>
        </div>
        <CardText>
          {`Odczuwalna temperatura ${cityWeather.main.feels_like.toFixed(
            1
          )}${celsiusSymbol}. ${capitalize(
            cityWeather.weather[0].description
          )}`}
        </CardText>
        <ul className="d-flex flex-wrap border-start border-info none-list-style mt-2">
          <li className="me-2">Wiatr: {`${cityWeather.wind.speed}m/s`}</li>
          <li className="me-2">
            Ciśnienie: {`${cityWeather.main.pressure}hPa`}
          </li>
          <li className="me-2">
            Wilgotność: {`${cityWeather.main.humidity}%`}
          </li>
          <li className="me-2">Widoczność: {`${cityWeather.visibility}m`}</li>
        </ul>
      </CardBody>
    </Card>
  );
};

export default CityPanel;
