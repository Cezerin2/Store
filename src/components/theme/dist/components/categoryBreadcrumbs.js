import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { text } from "../lib/settings";
import * as helper from "../lib/helper";

const CategoryBreadcrumbs = ({
  currentCategory,
  categories
}) => {
  const items = helper.getCategoryBreadcrumbs(currentCategory.id, categories);
  return /*#__PURE__*/React.createElement("nav", {
    className: "breadcrumb is-small",
    "aria-label": "breadcrumbs"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(NavLink, {
    to: "/"
  }, text.home)), items, /*#__PURE__*/React.createElement("li", {
    className: "is-active"
  }, /*#__PURE__*/React.createElement("a", {
    href: currentCategory.path,
    "aria-current": "page"
  }, currentCategory.name))));
};

CategoryBreadcrumbs.propTypes = {
  currentCategory: PropTypes.shape({}).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
export default CategoryBreadcrumbs;