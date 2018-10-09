import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
const fetchUserSucceed = user => {
  return {
    type: actionTypes.FETCH_USER_SUCCEED,
    payload: user
  };
};
const fetchUserFailed = err => {
  return {
    type: actionTypes.FETCH_USER_FAILED,
    payload: err.response.statusText
  };
};
export const fetchUser = () => async dispatch => {
  dispatch(authStart());
  try {
    const res = await axios.get("/api/current_user");
    dispatch(fetchUserSucceed(res.data));
  } catch (err) {
    dispatch(fetchUserFailed(err));
  }
};

export const handleStripeToken = token => {
  return async dispatch => {
    const res = await axios.post("/api/stripe", token);
    dispatch(fetchUserSucceed(res.data));
  };
};
