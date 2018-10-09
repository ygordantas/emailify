import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import Header from "./Header";
import Landing from "../components/Landing";

class App extends Component {
  componentDidMount() {
    this.props.onAuthStart();
  }
  render() {
    let routes = (
      <Switch>
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
    isLogged: state.auth._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthStart: () => dispatch(actionCreators.fetchUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
