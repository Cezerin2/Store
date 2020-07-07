import React from "react";
import { themeSettings, text } from "../../lib/settings";

const Attribute = ({
  name,
  value
}) => /*#__PURE__*/React.createElement("div", {
  className: "columns is-gapless is-mobile product-attribute"
}, /*#__PURE__*/React.createElement("div", {
  className: "column is-5 attribute-name"
}, name, ":"), /*#__PURE__*/React.createElement("div", {
  className: "column is-7 attribute-value"
}, value));

const Attributes = ({
  attributes
}) => {
  if (attributes && attributes.length > 0) {
    const items = attributes.map((attribute, index) => /*#__PURE__*/React.createElement(Attribute, {
      key: index,
      name: attribute.name,
      value: attribute.value
    }));
    return /*#__PURE__*/React.createElement("div", {
      className: "product-attributes"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title is-5"
    }, text.attributes), items);
  }

  return null;
};

export default Attributes;