import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";

import {
  SearchCityForm,
  CitiesTable,
  CityPanel,
  Spinner,
  ForecastPanel,
} from "../components";
import {
  cityWeatherDataSelector,
  cityWeatherStatusSelector,
} from "../selectors/cityWeather.selector";
import {
  citiesWeatherDataSelector,
  citiesWeatherStatusSelector,
} from "../selectors/citiesWeather.selector";
import {
  cityForecastDataSelector,
  cityForecastStatusSelector,
} from "../selectors/cityForecast.selector";
import { Status } from "../types";
import { fetchCitiesWeatherData } from "../actions/citiesWeather.action";
import { fetchCityWeatherData } from "../actions/cityWeather.action";
import { fetchCityForecastData } from "../actions/cityForecast.action";

type ParamsType = { city?: string };

const City = () => {
  const params = useParams<ParamsType>();
  const dispatch = useDispatch();

  const cityWeatherData = useSelector(cityWeatherDataSelector);
  const cityWeatherStatus = useSelector(cityWeatherStatusSelector);
  const citiesWeatherData = useSelector(citiesWeatherDataSelector);
  const citiesWeatherStatus = useSelector(citiesWeatherStatusSelector);
  const cityForecastData = useSelector(cityForecastDataSelector);
  const cityForecastStatus = useSelector(cityForecastStatusSelector);

  const isResolvedForecast = useMemo(
    () => cityForecastStatus === Status.RESOLVED,
    [cityForecastStatus]
  );

  const isLoadingForecast = useMemo(
    () =>
      cityForecastStatus === Status.IDLE ||
      cityForecastStatus === Status.PENDING,
    [cityForecastStatus]
  );

  const isLoadingCity = useMemo(
    () =>
      cityWeatherStatus === Status.IDLE || cityWeatherStatus === Status.PENDING,
    [cityWeatherStatus]
  );

  const isResolvedCity = useMemo(
    () => cityWeatherStatus === Status.RESOLVED,
    [cityWeatherStatus]
  );

  const isLoadingCities = useMemo(
    () =>
      citiesWeatherStatus === Status.IDLE ||
      citiesWeatherStatus === Status.PENDING,
    [citiesWeatherStatus]
  );

  const isResolvedCities = useMemo(
    () => citiesWeatherStatus === Status.RESOLVED,
    [citiesWeatherStatus]
  );

  // the forecast data will not be fetched until weather for the city has not been fetched
  useEffect(() => {
    cityWeatherData &&
      dispatch(
        fetchCityForecastData(
          cityWeatherData.coord.lat,
          cityWeatherData.coord.lon
        )
      );
  }, [cityWeatherData, cityWeatherData?.id, dispatch]);

  // fetch data based on the url city param, when you go to previous or next page
  useEffect(() => {
    if (localStorage.getItem("city") !== params.city) {
      dispatch(fetchCityWeatherData(params.city!));
      localStorage.setItem("city", params.city!);
    }
    if (params.city) {
      dispatch(fetchCityWeatherData(params.city!));
    }
  }, [params.city, dispatch]);

  // the cities data will not be fetched until weather for the city has not been fetched
  useEffect(() => {
    cityWeatherData && dispatch(fetchCitiesWeatherData());
  }, [dispatch, cityWeatherData]);

  return (
    <Row>
      <SearchCityForm />
      <Row className="my-5">
        <Col sm="8" md="4" lg="4" xl="3">
          {isLoadingCity && <Spinner />}
          {isResolvedCity && <CityPanel cityWeather={cityWeatherData!} />}
        </Col>
        <Col md="8" lg="6" xl="6" className="mt-5 mt-md-0">
          {isLoadingForecast && <Spinner />}
          {isResolvedCity && isResolvedForecast && (
            <ForecastPanel cityForecast={cityForecastData!} />
          )}
        </Col>
      </Row>
      {isLoadingCities && <Spinner />}
      {isResolvedCity && isResolvedCities && citiesWeatherData.length !== 0 && (
        <Row>
          <CitiesTable
            cityWeather={cityWeatherData!}
            citiesWeather={citiesWeatherData}
          />
        </Row>
      )}
    </Row>
  );
};

export default City;
