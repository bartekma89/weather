import { Status, WeatherAction, WeatherActionsType } from "../types";

export interface InitialState {
  data: null;
  status: string;
  error: null;
}

const weatherState: InitialState = {
  data: null,
  status: Status.IDLE,
  error: null,
};

export const weatherReducer = (
  state = weatherState,
  action: WeatherActionsType
) => {
  switch (action.type) {
    case WeatherAction.PENDING_WEATHER:
      return {
        ...state,
        status: Status.PENDING,
      };
    case WeatherAction.RESOLVED_WEATHER:
      return {
        ...state,
        status: Status.RESOLVED,
        data: action.payload,
        error: null,
      };
    case WeatherAction.REJECTED_WEATHER:
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
