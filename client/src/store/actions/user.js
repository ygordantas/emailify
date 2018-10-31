import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const fetchUserFailed = err => {
  return {
    type: actionTypes.FETCH_USER_FAILED,
    payload: err.response.statusText
  };
};
export const fetchUserSucceed = user => {
  return {
    type: actionTypes.FETCH_USER_SUCCEED,
    payload: user
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
