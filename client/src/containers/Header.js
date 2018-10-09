import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  render() {
    let navLinks = null;

    if (this.props.loading) {
      navLinks = <Spinner color="blue" size="big" />;
    } else {
      if (this.props.id) {
        navLinks = (
          <Fragment>
            <li>
              <Payments />
            </li>
            <li>
              <a>Credits: {this.props.credits}</a>
            </li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </Fragment>
        );
      } else {
        navLinks = (
          <Fragment>
            <li>
              <a href="/auth/google">Login with Google</a>
            </li>
            <li>
              <a href="/auth/facebook">Login with Facebook</a>
            </li>
          </Fragment>
        );
      }
    }

    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.id ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emailify
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {navLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth._id,
    loading: state.auth.loading,
    credits: state.auth.credits
  };
};

export default connect(mapStateToProps)(Header);
