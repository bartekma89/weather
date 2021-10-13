import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "../reducers";

export const configureStore = () => {
  const middleware = [thunk];
  const middlewareEnhancer = applyMiddleware(...middleware);

  return createStore(rootReducer, composeWithDevTools(middlewareEnhancer));
};
