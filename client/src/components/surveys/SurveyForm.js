import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import { validateEmails } from "../../utils/utils";
import inputOptions from "./inputOptions";

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        {inputOptions.map(({ label, name }) => (
          <Field
            key={name}
            component={SurveyField}
            type="text"
            name={name}
            label={label}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button className="teal btn right white-text" type="submit">
            Next <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
        <Link className="red btn left white-text" to="/surveys">
          Cancel <i className="material-icons left">arrow_back</i>
        </Link>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  inputOptions.forEach(({ name }) => {
    errors.recipients = validateEmails(values.recipients);

    if (!values[name]) {
      errors[name] = `You must provide a(n) ${name}!`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
