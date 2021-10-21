import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";

import { CityWeatherData } from "../types";
import { capitalize } from "../helpers";

interface ComponentProps {
  cityWeather: CityWeatherData;
}

const CityPanel = ({ cityWeather }: ComponentProps) => {
  return (
    <Row className="my-5">
      <Col sm="8" md="6" lg="4" xl="3">
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
                    className="mb-1"
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
                {Math.round(cityWeather.main.temp)}°C
              </span>
            </div>
            <CardText>
              {`Odczuwalna temperatura ${cityWeather.main.feels_like.toFixed(
                1
              )}°C. ${capitalize(cityWeather.weather[0].description)}`}
            </CardText>
            <ul className="d-flex flex-wrap border-start border-info none-list-style mt-2">
              <li>Wiatr: {`${cityWeather.wind.speed}m/s`}</li>
              <li>Ciśnienie: {`${cityWeather.main.pressure}hPa`}</li>
              <li>Wilgotność: {`${cityWeather.main.humidity}%`}</li>
              <li>Widoczność: {`${cityWeather.visibility}m`}</li>
            </ul>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CityPanel;
