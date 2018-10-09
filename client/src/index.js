// Dependencies
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
// --
// Reducers
import authReducer from "./store/reducers/authReducer";
import surveysReducer from "./store/reducers/surveysReducer";
// --
import App from "./containers/App";

const rootReducer = combineReducers({
  auth: authReducer,
  surveys: surveysReducer
});

let composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
