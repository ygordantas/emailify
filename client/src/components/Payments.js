import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emailify Inc."
        description="$5 for 5 emails credits"
        amount={500}
        currency="CAD"
        token={token => this.props.onPaymentSubmitted(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="waves-effect waves-light btn">Add credits</button>
      </StripeCheckout>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPaymentSubmitted: token =>
      dispatch(actionCreators.handleStripeToken(token))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Payments);
