import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { SearchCityForm, CitiesTable, CityPanel } from "../components";
import {
  cityWeatherDataSelector,
  cityWeatherErrorSelector,
  cityWeatherStatusSelector,
} from "../selectors/cityWeather.selector";
import {
  citiesWeatherDataSelector,
  citiesWeatherStatusSelector,
  citiesWeatherErrorSelector,
} from "../selectors/citiesWeather.selector";
import { Routes } from "../constants/routes";
import { Status } from "../types";
import { fetchCitiesWeatherData } from "../actions/citiesWeather.action";
import { fetchCityWeatherData } from "../actions/cityWeather.action";

type ParamsType = { city?: string };

const City = () => {
  const cityWeatherData = useSelector(cityWeatherDataSelector);
  const cityWeatherStatus = useSelector(cityWeatherStatusSelector);
  const cityWeatherError = useSelector(cityWeatherErrorSelector);
  const citiesWeatherData = useSelector(citiesWeatherDataSelector);
  const citiesWeatherStatus = useSelector(citiesWeatherStatusSelector);
  const citiesWeatherError = useSelector(citiesWeatherErrorSelector);
  const history = useHistory();
  const params = useParams<ParamsType>();
  const dispatch = useDispatch();

  const isLoadingCity = useMemo(() => {
    return (
      cityWeatherStatus === Status.IDLE || cityWeatherStatus === Status.PENDING
    );
  }, [cityWeatherStatus]);

  const isResolvedCity = useMemo(() => {
    return cityWeatherStatus === Status.RESOLVED;
  }, [cityWeatherStatus]);

  const isLoadingCities = useMemo(() => {
    return (
      citiesWeatherStatus === Status.IDLE ||
      citiesWeatherStatus === Status.PENDING
    );
  }, [citiesWeatherStatus]);

  const isResolvedCities = useMemo(() => {
    return citiesWeatherStatus === Status.RESOLVED;
  }, [citiesWeatherStatus]);

  useEffect(() => {
    if (localStorage.getItem("city") !== params.city) {
      dispatch(fetchCityWeatherData(params.city!));
    }
  }, [params.city, dispatch]);

  useEffect(() => {
    if (!cityWeatherData && !cityWeatherError) {
      history.push(Routes.HOME);
    }
  }, [history, cityWeatherData, cityWeatherError]);

  useEffect(() => {
    // TODO: obsługa jakby nie zwrocilo danych
    cityWeatherData && dispatch(fetchCitiesWeatherData());
  }, [dispatch, cityWeatherData]);

  return (
    <>
      <SearchCityForm />
      {isLoadingCity && <div>Loading...</div>}
      {isResolvedCity && <CityPanel cityWeather={cityWeatherData!} />}
      {isLoadingCities && <div>isLoading...</div>}
      {isResolvedCity && isResolvedCities && (
        <CitiesTable
          cityWeather={cityWeatherData!}
          citiesWeather={citiesWeatherData}
        />
      )}
    </>
  );
};

export default City;
