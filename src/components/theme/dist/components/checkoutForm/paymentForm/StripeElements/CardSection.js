import React from "react";
import { CardElement } from "react-stripe-elements";

const CardSection = ({
  title
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, title), /*#__PURE__*/React.createElement(CardElement, null));

export default CardSection;