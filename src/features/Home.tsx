import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { fetchWeatherData } from "../actions";
import { useHistory } from "react-router";

const http = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  headers: {
    "content-type": "application/json",
  },
});

const Home = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const result = await http.get(
    //   `weather?q=${city}&lang=pl&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    // );

    dispatch(fetchWeatherData(city));
  };

  console.log(city);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        value={city}
        onChange={handleChange}
        placeholder="London, Warsaw, etc."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Home;
