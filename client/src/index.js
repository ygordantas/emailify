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
import userReducer from "./store/reducers/userReducer";
import surveysReducer from "./store/reducers/surveysReducer";
import { reducer as formReducer } from "redux-form";
// --
import App from "./components/App";
import axios from "axios";
window.axios = axios;

const rootReducer = combineReducers({
  user: userReducer,
  surveys: surveysReducer,
  form: formReducer
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
