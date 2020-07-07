import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { themeSettings, text } from "../lib/settings";
import * as helper from "../lib/helper";

const SummaryItem = ({
  settings,
  item,
  updateCartItemQuantiry
}) => {
  const thumbnail = helper.getThumbnailUrl(item.image_url, themeSettings.cartThumbnailWidth);
  const qtyOptions = [];
  const maxQty = item.stock_backorder ? themeSettings.maxCartItemQty : item.stock_quantity >= themeSettings.maxCartItemQty ? themeSettings.maxCartItemQty : item.stock_quantity;

  for (let i = 0; i <= maxQty; i++) {
    const optionText = i === 0 ? text.remove : i;
    qtyOptions.push( /*#__PURE__*/React.createElement("option", {
      key: i,
      value: i
    }, optionText));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "columns is-mobile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column is-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement(NavLink, {
    to: item.path
  }, /*#__PURE__*/React.createElement("img", {
    className: "product-image",
    src: thumbnail,
    alt: item.name,
    title: item.name
  })))), /*#__PURE__*/React.createElement("div", {
    className: "column"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavLink, {
    to: item.path
  }, item.name)), item.variant_name.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "cart-option-name"
  }, item.variant_name), /*#__PURE__*/React.createElement("div", {
    className: "qty"
  }, /*#__PURE__*/React.createElement("span", null, text.qty, ":"), /*#__PURE__*/React.createElement("span", {
    className: "select is-small"
  }, /*#__PURE__*/React.createElement("select", {
    onChange: e => {
      updateCartItemQuantiry(item.id, e.target.value);
    },
    value: item.quantity
  }, qtyOptions)))), /*#__PURE__*/React.createElement("div", {
    className: "column is-3 has-text-right price"
  }, helper.formatCurrency(item.price_total, settings)));
};

SummaryItem.propTypes = {
  settings: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
  updateCartItemQuantiry: PropTypes.func.isRequired
};

const OrderSummary = props => {
  const {
    updateCartItemQuantiry,
    state: {
      cart,
      settings
    }
  } = props;

  if (cart && cart.items && cart.items.length > 0) {
    const items = cart.items.map(item => /*#__PURE__*/React.createElement(SummaryItem, {
      key: item.id,
      item: item,
      updateCartItemQuantiry: updateCartItemQuantiry,
      settings: settings
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "checkout-box content is-small",
      style: {
        paddingBottom: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "title is-4"
    }, text.orderSummary), /*#__PURE__*/React.createElement("hr", {
      className: "separator"
    }), items, /*#__PURE__*/React.createElement("div", {
      className: "columns is-mobile is-gapless is-multiline summary-block"
    }, cart.tax_total > 0 && cart.item_tax_included && /*#__PURE__*/React.createElement("div", {
      className: "column is-7"
    }, text.included_tax), cart.tax_total > 0 && cart.item_tax_included && /*#__PURE__*/React.createElement("div", {
      className: "column is-5 has-text-right price"
    }, helper.formatCurrency(cart.tax_total, settings)), /*#__PURE__*/React.createElement("div", {
      className: "column is-7"
    }, text.subtotal), /*#__PURE__*/React.createElement("div", {
      className: "column is-5 has-text-right price"
    }, helper.formatCurrency(cart.subtotal, settings)), /*#__PURE__*/React.createElement("div", {
      className: "column is-7"
    }, text.shipping), /*#__PURE__*/React.createElement("div", {
      className: "column is-5 has-text-right price"
    }, helper.formatCurrency(cart.shipping_total, settings)), cart.discount_total > 0 && /*#__PURE__*/React.createElement("div", {
      className: "column is-7"
    }, text.discount), cart.discount_total > 0 && /*#__PURE__*/React.createElement("div", {
      className: "column is-5 has-text-right price"
    }, helper.formatCurrency(cart.discount_total, settings)), cart.tax_total > 0 && !cart.item_tax_included && /*#__PURE__*/React.createElement("div", {
      className: "column is-7"
    }, text.tax), cart.tax_total > 0 && !cart.item_tax_included && /*#__PURE__*/React.createElement("div", {
      className: "column is-5 has-text-right price"
    }, helper.formatCurrency(cart.tax_total, settings)), /*#__PURE__*/React.createElement("div", {
      className: "column is-12"
    }, /*#__PURE__*/React.createElement("hr", {
      className: "separator"
    })), /*#__PURE__*/React.createElement("div", {
      className: "column is-6 total-text"
    }, text.grandTotal), /*#__PURE__*/React.createElement("div", {
      className: "column is-6 total-price"
    }, helper.formatCurrency(cart.grand_total, settings))));
  }

  return null;
};

OrderSummary.propTypes = {
  updateCartItemQuantiry: PropTypes.func.isRequired,
  state: PropTypes.shape({
    cart: PropTypes.shape({}),
    settings: PropTypes.shape({}).isRequired
  }).isRequired
};
export default OrderSummary;