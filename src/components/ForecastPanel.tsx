import { CELSIUS_SYMBOL } from "../constants";
import { CityForecastData } from "../types";
import { capitalize, getFormatDate } from "../helpers";
import { Card, CardBody } from "reactstrap";

interface ComponentProps {
  cityForecast: CityForecastData;
}

const ForecastPanel = ({ cityForecast }: ComponentProps) => {
  return (
    <Card>
      <CardBody>
        <h4>{cityForecast?.daily?.length}-day forecast</h4>
        <ul id="daily-list" className="mb-0 ps-0">
          {cityForecast?.daily?.map((daily, idx) => (
            <li
              key={`${idx}_${daily?.dt}`}
              className="none-list-style d-flex justify-content-between
            "
            >
              <span>{getFormatDate(daily.dt * 1000)}</span>
              <div
                className="d-flex justify-content-between"
                style={{ flexBasis: "65%" }}
              >
                <div className="d-flex justify-content-start">
                  <img
                    src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}.png`}
                    alt="country flag"
                    height="35"
                  />
                  <span>
                    {Math.round(daily.temp.max)} / {Math.round(daily.temp.min)}{" "}
                    {CELSIUS_SYMBOL}
                  </span>{" "}
                </div>
                <span className="d-flex flex-wrap text-end">
                  {capitalize(daily.weather[0].description)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default ForecastPanel;
