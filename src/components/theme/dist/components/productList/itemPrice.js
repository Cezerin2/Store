import React from "react";
import { themeSettings, text } from "../../lib/settings";
import * as helper from "../../lib/helper";

const FormattedCurrency = ({
  number,
  settings
}) => helper.formatCurrency(number, settings);

const ItemPrice = ({
  product,
  settings
}) => {
  const priceStyle = {};

  if (themeSettings.list_price_size && themeSettings.list_price_size > 0) {
    priceStyle.fontSize = `${themeSettings.list_price_size}px`;
  }

  if (themeSettings.list_price_color && themeSettings.list_price_color.length > 0) {
    priceStyle.color = themeSettings.list_price_color;
  }

  if (product.stock_status === "discontinued") {
    return /*#__PURE__*/React.createElement("div", {
      className: "product-price"
    }, text.discontinued);
  }

  if (product.stock_status === "out_of_stock") {
    return /*#__PURE__*/React.createElement("div", {
      className: "product-price"
    }, text.outOfStock);
  }

  if (product.on_sale) {
    return /*#__PURE__*/React.createElement("div", {
      className: "product-price"
    }, /*#__PURE__*/React.createElement("span", {
      className: "product-new-price"
    }, /*#__PURE__*/React.createElement(FormattedCurrency, {
      settings: settings,
      number: product.price
    })), /*#__PURE__*/React.createElement("del", {
      className: "product-old-price"
    }, /*#__PURE__*/React.createElement(FormattedCurrency, {
      settings: settings,
      number: product.regular_price
    })));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "product-price",
    style: priceStyle
  }, /*#__PURE__*/React.createElement(FormattedCurrency, {
    settings: settings,
    number: product.price
  }));
};

export default ItemPrice;