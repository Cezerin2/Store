import React from "react";
import { themeSettings, text } from "../../lib/settings";
import Item from "./item";
import LoadMore from "./loadMore";

const ProductList = ({
  products,
  addCartItem,
  settings,
  loadMoreProducts,
  hasMore,
  loadingProducts,
  loadingMoreProducts,
  isCentered,
  className = "columns is-multiline is-mobile products",
  columnCountOnMobile,
  columnCountOnTablet,
  columnCountOnDesktop,
  columnCountOnWidescreen,
  columnCountOnFullhd
}) => {
  const items = products ? products.map(product => /*#__PURE__*/React.createElement(Item, {
    key: product.id,
    product: product,
    addCartItem: addCartItem,
    settings: settings,
    columnCountOnMobile: columnCountOnMobile,
    columnCountOnTablet: columnCountOnTablet,
    columnCountOnDesktop: columnCountOnDesktop,
    columnCountOnWidescreen: columnCountOnWidescreen,
    columnCountOnFullhd: columnCountOnFullhd
  })) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: className + (loadingProducts ? " loading" : "") + (isCentered ? " is-centered" : "")
  }, items), /*#__PURE__*/React.createElement("div", {
    className: "load-more"
  }, /*#__PURE__*/React.createElement(LoadMore, {
    loadMoreProducts: loadMoreProducts,
    hasMore: hasMore,
    loading: loadingMoreProducts
  })));
};

export default ProductList;