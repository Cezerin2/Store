import React from "react";
import { Elements } from "react-stripe-elements";
import InjectedCheckoutForm from "./CheckoutForm";

const StoreCheckout = ({
  formSettings,
  shopSettings,
  onPayment,
  onCreateToken
}) => /*#__PURE__*/React.createElement(Elements, null, /*#__PURE__*/React.createElement(InjectedCheckoutForm, {
  formSettings: formSettings,
  shopSettings: shopSettings,
  onPayment: onPayment,
  onCreateToken: onCreateToken
}));

export default StoreCheckout;