import React from "react";
import PropTypes from "prop-types";
import * as helper from "../lib/helper";
import MetaTags from "../components/metaTags";
import CheckoutSuccess from "../components/checkoutSuccess";

const CheckoutSuccessContainer = props => {
  const {
    state: {
      pageDetails,
      order,
      settings,
      shippingMethods,
      checkoutFields
    }
  } = props;
  const shippingMethod = helper.getShippingMethodFromOrder(order, shippingMethods);
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
    className: "columns content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column is-8 is-offset-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-box"
  }, /*#__PURE__*/React.createElement(CheckoutSuccess, {
    order: order,
    settings: settings,
    pageDetails: pageDetails,
    shippingMethod: shippingMethod,
    checkoutFields: checkoutFields
  })))))));
};

CheckoutSuccessContainer.propTypes = {
  state: PropTypes.shape({
    settings: PropTypes.shape({}),
    pageDetails: PropTypes.shape({}),
    order: PropTypes.shape({}),
    shippingMethods: PropTypes.arrayOf(PropTypes.shape({})),
    checkoutFields: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
};
export default CheckoutSuccessContainer;