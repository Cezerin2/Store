import React from "react";
import PropTypes from "prop-types";
import MetaTags from "../components/metaTags";
import OrderSummary from "../components/orderSummary";
import CheckoutForm from "../components/checkoutForm";

const CheckoutContainer = props => {
  const {
    state: {
      pageDetails
    }
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetaTags, {
    title: pageDetails.meta_title,
    description: pageDetails.meta_description,
    canonicalUrl: pageDetails.url,
    ogTitle: pageDetails.meta_title,
    ogDescription: pageDetails.meta_description
  }), /*#__PURE__*/React.createElement("section", {
    className: "section section-checkout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "columns columns-checkout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column is-5-widescreen is-offset-1-widescreen is-6-desktop"
  }, /*#__PURE__*/React.createElement(OrderSummary, props)), /*#__PURE__*/React.createElement("div", {
    className: "column is-6-widescreen is-6-desktop"
  }, /*#__PURE__*/React.createElement(CheckoutForm, props))))));
};

CheckoutContainer.propTypes = {
  state: PropTypes.shape({
    pageDetails: PropTypes.shape({})
  }).isRequired
};
export default CheckoutContainer;