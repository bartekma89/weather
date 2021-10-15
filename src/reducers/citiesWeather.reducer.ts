import {
  Status,
  CitiesWeatherAction,
  CitiesWeatherActionsType,
  CityWeatherData,
  Error,
} from "../types";

export interface InitialState {
  data: CityWeatherData[] | [];
  status: Status;
  error: Error;
}

const cityWeatherState: InitialState = {
  data: [],
  status: Status.IDLE,
  error: null,
};

export const citiesWeatherReducer = (
  state = cityWeatherState,
  action: CitiesWeatherActionsType
) => {
  switch (action.type) {
    case CitiesWeatherAction.PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case CitiesWeatherAction.RESOLVED:
      return {
        ...state,
        status: Status.RESOLVED,
        data: action.payload,
        error: null,
      };
    case CitiesWeatherAction.REJECTED:
      return {
        ...state,
        status: Status.REJECTED,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};
