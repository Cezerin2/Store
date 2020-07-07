import React, { Fragment } from "react";
import { themeSettings, text } from "../../lib/settings";
import CustomProducts from "../products/custom";

class RelatedProducts extends React.PureComponent {
  render() {
    const {
      ids,
      settings,
      addCartItem,
      limit
    } = this.props;

    if (ids && ids.length > 0) {
      const title = themeSettings.related_products_title && themeSettings.related_products_title.length > 0 ? themeSettings.related_products_title : text.relatedProducts;
      return /*#__PURE__*/React.createElement("section", {
        className: "section section-product-related"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "title is-4 has-text-centered"
      }, title), /*#__PURE__*/React.createElement(CustomProducts, {
        ids: ids,
        sort: null,
        limit: limit,
        isCentered: true,
        settings: settings,
        addCartItem: addCartItem
      })));
    }

    return null;
  }

}

export default RelatedProducts;