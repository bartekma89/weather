import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { fetchCityWeatherData } from "../actions/cityWeather.action";
import { useHistory } from "react-router";

const SearchCityForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(fetchCityWeatherData(value));
      setValue("");
      localStorage.setItem("city", value);
      history.push(`/city/${value}`);
    } catch {
      history.push(`/${value}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        value={value}
        onChange={handleChange}
        placeholder="London, Warsaw, etc."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchCityForm;
