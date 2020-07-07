import React from "react";
import PropTypes from "prop-types";
import { themeSettings, text } from "../lib/settings";

const Sort = ({
  defaultSort,
  currentSort,
  setSort
}) => /*#__PURE__*/React.createElement("div", {
  className: "columns is-mobile sort"
}, /*#__PURE__*/React.createElement("div", {
  className: "column is-4 sort-title"
}, text.sort, ":"), /*#__PURE__*/React.createElement("div", {
  className: "column"
}, /*#__PURE__*/React.createElement("span", {
  className: "select is-fullwidth"
}, /*#__PURE__*/React.createElement("select", {
  onChange: e => {
    setSort(e.target.value);
  },
  value: currentSort
}, /*#__PURE__*/React.createElement("option", {
  value: defaultSort
}, text.sortFavorite), /*#__PURE__*/React.createElement("option", {
  value: themeSettings.sortNewest
}, text.sortNewest), /*#__PURE__*/React.createElement("option", {
  value: themeSettings.sortPriceLow
}, text.sortPriceLow), /*#__PURE__*/React.createElement("option", {
  value: themeSettings.sortPriceHigh
}, text.sortPriceHigh)))));

Sort.propTypes = {
  defaultSort: PropTypes.string.isRequired,
  currentSort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired
};
export default Sort;