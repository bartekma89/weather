import {
  Status,
  CityWeatherAction,
  CityWeatherActionsType,
  CityWeatherData,
  Error,
} from "../types";

export interface InitialState {
  data: CityWeatherData | null;
  status: Status;
  error: Error;
}

const cityWeatherState: InitialState = {
  data: null,
  status: Status.IDLE,
  error: null,
};

export const cityWeatherReducer = (
  state = cityWeatherState,
  action: CityWeatherActionsType
) => {
  switch (action.type) {
    case CityWeatherAction.PENDING:
      return {
        ...state,
        status: Status.PENDING,
      };
    case CityWeatherAction.RESOLVED:
      return {
        ...state,
        status: Status.RESOLVED,
        data: action.payload,
        error: null,
      };
    case CityWeatherAction.REJECTED:
      return {
        ...state,
        status: Status.REJECTED,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
};
