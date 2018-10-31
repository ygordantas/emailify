import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utils";
const initState = {};

export default function surveysReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SUBMISSION_STARTED:
      return updateObj(state, { loading: true });
    case actionTypes.SUBMISSION_FAILED:
      return updateObj(state, { loading: false, error: action.payload });
    case actionTypes.SUBMISSION_SUCCESSFUL:
      return updateObj(state, { ...action.payload, loading: false });
    default:
      return state;
  }
}
