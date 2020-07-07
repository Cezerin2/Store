import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { text } from "../lib/settings";
import * as helper from "../lib/helper";

const getCheckoutField = (checkoutFields, fieldName) => {
  if (checkoutFields && checkoutFields.length > 0) {
    return checkoutFields.find(f => f.name === fieldName && f.status !== "hidden");
  }

  return null;
};

const MobileField = ({
  order,
  checkoutFields
}) => {
  const checkoutField = getCheckoutField(checkoutFields, "mobile");
  return checkoutField && order.mobile !== "" ? /*#__PURE__*/React.createElement(ShippingFieldDiv, {
    label: helper.getCheckoutFieldLabel(checkoutField),
    value: order.mobile
  }) : null;
};

const CityField = ({
  order,
  checkoutFields
}) => {
  const checkoutField = getCheckoutField(checkoutFields, "city");
  return checkoutField && order.shipping_address.city !== "" ? /*#__PURE__*/React.createElement(ShippingFieldDiv, {
    label: helper.getCheckoutFieldLabel(checkoutField),
    value: order.shipping_address.city
  }) : null;
};

const CommentsField = ({
  order,
  checkoutFields
}) => {
  const checkoutField = getCheckoutField(checkoutFields, "comments");
  return checkoutField && order.comments !== "" ? /*#__PURE__*/React.createElement(ShippingFieldDiv, {
    label: helper.getCheckoutFieldLabel(checkoutField),
    value: order.comments
  }) : null;
};

const ShippingFields = ({
  order,
  shippingMethod
}) => {
  let shippingFields = null;

  if (shippingMethod && shippingMethod.fields && shippingMethod.fields.length > 0) {
    shippingFields = shippingMethod.fields.map((field, index) => {
      const fieldLabel = helper.getShippingFieldLabel(field);
      const fieldValue = order.shipping_address[field.key];
      return /*#__PURE__*/React.createElement(ShippingFieldDiv, {
        key: index,
        label: fieldLabel,
        value: fieldValue
      });
    });
  }

  return /*#__PURE__*/React.createElement("div", null, shippingFields);
};

const ShippingFieldDiv = ({
  label,
  value
}) => /*#__PURE__*/React.createElement("div", {
  className: "shipping-field"
}, /*#__PURE__*/React.createElement("label", null, label, ": "), value);

const OrderItem = ({
  item,
  settings
}) => /*#__PURE__*/React.createElement("div", {
  className: "columns is-mobile is-gapless checkout-success-row"
}, /*#__PURE__*/React.createElement("div", {
  className: "column is-6"
}, item.name, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, item.variant_name)), /*#__PURE__*/React.createElement("div", {
  className: "column is-2 has-text-right"
}, helper.formatCurrency(item.price, settings)), /*#__PURE__*/React.createElement("div", {
  className: "column is-2 has-text-centered"
}, item.quantity), /*#__PURE__*/React.createElement("div", {
  className: "column is-2 has-text-right"
}, helper.formatCurrency(item.price_total, settings)));

const OrderItems = ({
  items,
  settings
}) => {
  if (items && items.length > 0) {
    const rows = items.map(item => /*#__PURE__*/React.createElement(OrderItem, {
      key: item.id,
      item: item,
      settings: settings
    }));
    return /*#__PURE__*/React.createElement("div", null, rows);
  }

  return null;
};

const CheckoutSuccess = ({
  order,
  settings,
  pageDetails,
  shippingMethod,
  checkoutFields
}) => {
  if (order && order.items && order.items.length > 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "checkout-success-details"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "checkout-success-title"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/images/success.svg",
      alt: ""
    }), /*#__PURE__*/React.createElement("br", null), text.checkoutSuccessTitle), /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: pageDetails.content
      }
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "columns",
      style: {
        marginBottom: "3rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "column is-6"
    }, /*#__PURE__*/React.createElement("b", null, text.shipping), /*#__PURE__*/React.createElement(MobileField, {
      order: order,
      checkoutFields: checkoutFields
    }), /*#__PURE__*/React.createElement(CityField, {
      order: order,
      checkoutFields: checkoutFields
    }), /*#__PURE__*/React.createElement(ShippingFields, {
      order: order,
      shippingMethod: shippingMethod
    }), /*#__PURE__*/React.createElement(CommentsField, {
      order: order,
      checkoutFields: checkoutFields
    })), /*#__PURE__*/React.createElement("div", {
      className: "column is-6"
    }, /*#__PURE__*/React.createElement("b", null, text.orderNumber), ": ", order.number, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, text.shippingMethod), ": ", order.shipping_method, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, text.paymentMethod), ": ", order.payment_method, /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("div", {
      className: "columns is-mobile is-gapless checkout-success-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column is-6"
    }, /*#__PURE__*/React.createElement("b", null, text.productName)), /*#__PURE__*/React.createElement("div", {
      className: "column is-2 has-text-right"
    }, /*#__PURE__*/React.createElement("b", null, text.price)), /*#__PURE__*/React.createElement("div", {
      className: "column is-2 has-text-centered"
    }, /*#__PURE__*/React.createElement("b", null, text.qty)), /*#__PURE__*/React.createElement("div", {
      className: "column is-2 has-text-right"
    }, /*#__PURE__*/React.createElement("b", null, text.total))), /*#__PURE__*/React.createElement(OrderItems, {
      items: order.items,
      settings: settings
    }), /*#__PURE__*/React.createElement("div", {
      className: "columns"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column is-offset-7 checkout-success-totals"
    }, order.tax_total > 0 && order.item_tax_included && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, text.included_tax, ":"), /*#__PURE__*/React.createElement("span", null, helper.formatCurrency(order.tax_total, settings))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, text.subtotal, ":"), /*#__PURE__*/React.createElement("span", null, helper.formatCurrency(order.subtotal, settings))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, text.shipping, ":"), /*#__PURE__*/React.createElement("span", null, helper.formatCurrency(order.shipping_total, settings))), order.tax_total > 0 && !order.item_tax_included && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, text.tax, ":"), /*#__PURE__*/React.createElement("span", null, helper.formatCurrency(order.tax_total, settings))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, text.grandTotal, ":"), /*#__PURE__*/React.createElement("b", null, helper.formatCurrency(order.grand_total, settings))))));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "has-text-centered"
  }, text.cartEmpty);
};

CheckoutSuccess.propTypes = {
  order: PropTypes.shape({}),
  settings: PropTypes.shape({}).isRequired,
  pageDetails: PropTypes.shape({}).isRequired,
  shippingMethod: PropTypes.shape({}).isRequired,
  checkoutFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
CheckoutSuccess.defaultProps = {
  order: null
};
export default CheckoutSuccess;