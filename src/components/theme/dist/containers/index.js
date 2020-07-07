import React from "react";
import PropTypes from "prop-types";
import { themeSettings } from "../lib/settings";
import MetaTags from "../components/metaTags";
import CustomProducts from "../components/products/custom";
import HomeSlider from "../components/homeSlider";

const IndexContainer = props => {
  const {
    addCartItem,
    state: {
      pageDetails,
      settings
    }
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetaTags, {
    title: pageDetails.meta_title,
    description: pageDetails.meta_description,
    canonicalUrl: pageDetails.url,
    ogTitle: pageDetails.meta_title,
    ogDescription: pageDetails.meta_description
  }), themeSettings.home_slider_show ? /*#__PURE__*/React.createElement(HomeSlider, {
    images: themeSettings.home_slider
  }) : null, pageDetails.content && pageDetails.content.length > 10 && /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: pageDetails.content
    }
  })))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title is-4 has-text-centered"
  }, themeSettings.home_products_title), /*#__PURE__*/React.createElement(CustomProducts, {
    sku: themeSettings.home_products_sku,
    sort: themeSettings.home_products_sort,
    limit: themeSettings.home_products_limit,
    settings: settings,
    addCartItem: addCartItem
  }))));
};

IndexContainer.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  state: PropTypes.shape({
    settings: PropTypes.shape({}),
    pageDetails: PropTypes.shape({})
  }).isRequired
};
export default IndexContainer;