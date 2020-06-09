import React, { useState } from "react";
import { injectStripe } from "react-stripe-elements";
import CardSection from "./CardSection";

const CheckoutForm = (props) => {
  const [inProgress, setInProgress] = useState(false);
  // submit = submit.bind(this)

  async function submit() {
    setInProgress(true);
    const { formSettings, onCreateToken, stripe } = props;
    const { token } = await stripe.createToken({
      name: formSettings.email,
    });
    if (token && token !== "undefined") {
      onCreateToken(token.id);
    } else {
      setInProgress(false);
    }
  }

  return (
    <>
      <CardSection title="Credit Card details" />
      <div className="checkout-button-wrap">
        <button
          onClick={submit}
          disabled={inProgress}
          className={`checkout-button button is-primary${
            inProgress ? " is-loading" : ""
          }`}
        >
          Confirm order
        </button>
      </div>
    </>
  );
};

export default injectStripe(CheckoutForm);
