import * as actionTypes from "./actionTypes";
import { fetchUserSucceed } from "../actions";
import axios from "axios";

const submissionStarted = () => ({ type: actionTypes.SUBMISSION_STARTED });

const submissionFailed = e => ({
  type: actionTypes.SUBMISSION_FAILED,
  payload: e
});

const submissionSuccessful = values => ({
  type: actionTypes.SUBMISSION_SUCCESSFUL,
  payload: values
});

export const submitSurvey = (values, history) => async dispatch => {
  dispatch(submissionStarted());
  try {
    const res = await axios.post("/api/surveys", values);
    dispatch(submissionSuccessful(values));
    history.push("/surveys");
    dispatch(fetchUserSucceed(res.data));
  } catch (e) {
    dispatch(submissionFailed(e));
  }
};
