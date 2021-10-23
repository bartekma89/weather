import {
  CityForecastData,
  Status,
  Error,
  CityForecastActionsType,
  CityForecastAction,
} from "../types";

export interface InitialState {
  data: CityForecastData | null;
  status: Status;
  error: Error;
}

const cityForecastState: InitialState = {
  data: null,
  status: Status.IDLE,
  error: null,
};

export const cityForecastReducer = (
  state = cityForecastState,
  action: CityForecastActionsType
) => {
  switch (action.type) {
    case CityForecastAction.PENDING:
      return { ...state, status: Status.PENDING };
    case CityForecastAction.RESOLVED:
      return {
        ...state,
        status: Status.RESOLVED,
        data: action.payload,
        error: null,
      };
    case CityForecastAction.REJECTED:
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
