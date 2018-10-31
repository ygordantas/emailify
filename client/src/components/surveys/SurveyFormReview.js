import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import inputOptions from "./inputOptions";
import Spinner from "../Spinner";
import * as actionCreators from "../../store/actions";

const SurveyFormReview = ({
  onReturnClicked,
  formValues,
  onSurveySubmit,
  loading,
  history
}) => {
  const renderFields = inputOptions.map(({ label, name }) => (
    <div key={label}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  let content = null;
  if (loading) {
    content = (
      <div style={{ textAlign: "center" }}>
        <Spinner size="big" />
      </div>
    );
  } else {
    content = (
      <div>
        <h5>Please confirm your entries</h5>
        {renderFields}
        <button
          className="yellow darken-3 btn-flat left white-text"
          onClick={() => onReturnClicked()}
        >
          Return <i className="material-icons left">arrow_back</i>
        </button>
        <button
          onClick={() => onSurveySubmit(formValues, history)}
          className="green btn-flat right white-text"
        >
          Send Survey <i className="material-icons right">send</i>
        </button>
      </div>
    );
  }

  return content;
};

const mapStateToProps = state => {
  return {
    formValues: state.form.surveyForm.values,
    loading: state.surveys.loading,
    error: state.surveys.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSurveySubmit: (inputValues, history) =>
      dispatch(actionCreators.submitSurvey(inputValues, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SurveyFormReview));
