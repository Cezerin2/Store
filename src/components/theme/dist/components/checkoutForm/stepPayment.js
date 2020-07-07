import React from "react";
import { themeSettings, text } from "../../lib/settings";
import PaymentForm from "./paymentForm";

const CheckoutStepPayment = props => {
  const {
    cart,
    settings,
    processingCheckout,
    handleSuccessPayment,
    inputClassName,
    buttonClassName,
    shippingMethod,
    show,
    title,
    onCreateToken
  } = props;
  const {
    payment_method_gateway,
    grand_total
  } = cart;

  if (!show) {
    return /*#__PURE__*/React.createElement("div", {
      className: "checkout-step"
    }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "3"), title));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "checkout-step"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "3"), title), /*#__PURE__*/React.createElement("div", {
    className: "checkout-button-wrap"
  }, !processingCheckout && /*#__PURE__*/React.createElement(PaymentForm, {
    gateway: payment_method_gateway,
    amount: grand_total,
    shopSettings: settings,
    shippingMethod: shippingMethod,
    onPayment: handleSuccessPayment,
    inputClassName: inputClassName,
    buttonClassName: buttonClassName,
    onCreateToken: onCreateToken
  }), processingCheckout && /*#__PURE__*/React.createElement("p", null, text.loading)));
};

export default CheckoutStepPayment;