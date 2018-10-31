import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utils";

const initState = {
  _id: null,
  googleID: null,
  facebookID: null,
  credits: 0,
  loading: false,
  error: false
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObj(state, { loading: true });
    case actionTypes.FETCH_USER_SUCCEED:
      return updateObj(state, {
        ...action.payload,
        loading: false,
        error: false
      });
    case actionTypes.FETCH_USER_FAILED:
      return updateObj(state, { loading: false });
    default:
      return state;
  }
}
