import { CityWeatherData } from "../types";

interface ComponentProps {
  cityWeather: CityWeatherData;
}

const CityPanel = ({ cityWeather }: ComponentProps) => {
  return (
    <div>
      <div>
        <strong>
          {cityWeather?.name}, {cityWeather?.sys.country}{" "}
          <img
            src={`http://openweathermap.org/images/flags/${cityWeather?.sys.country.toLowerCase()}.png`}
            alt="flag country"
          />{" "}
        </strong>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          whiteSpace: "nowrap",
        }}
      >
        <img
          src={`http://openweathermap.org/img/wn/${cityWeather?.weather[0].icon}@2x.png`}
          alt="cloudy weather"
          height="50"
        />
        <span style={{ fontSize: "36px" }}>
          {Math.round(cityWeather.main.temp)}°C
        </span>
      </div>
      <div>
        {`Odczuwalna temperatura ${cityWeather.main.feels_like.toFixed(1)}°C. ${
          cityWeather.weather[0].description
        }`}
      </div>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          borderLeft: "1px solid black",
        }}
      >
        <li style={{ marginRight: "1rem" }}>
          Wiatr: {`${cityWeather.wind.speed}m/s`}
        </li>
        <li style={{ marginRight: "1rem" }}>
          Ciśnienie: {`${cityWeather.main.pressure}hPa`}
        </li>
        <li style={{ marginRight: "1rem" }}>
          Wilgotność: {`${cityWeather.main.humidity}%`}
        </li>
        <li style={{ marginRight: "1rem" }}>
          Widoczność: {`${cityWeather.visibility}m`}
        </li>
      </ul>
    </div>
  );
};

export default CityPanel;
