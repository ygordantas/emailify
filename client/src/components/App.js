import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  componentDidMount() {
    this.props.onAuthStart();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/surveys/new" component={SurveyNew} />
        <Route path="/surveys" component={Dashboard} />
        <Route path="/" component={Landing} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div className="container">
        <Header />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.user._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthStart: () => dispatch(actionCreators.fetchUser())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
