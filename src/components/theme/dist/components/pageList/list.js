import React from "react";
import { themeSettings, text } from "../../lib/settings";
import PageListItem from "./item";

const PageList = ({
  pages
}) => {
  const items = pages ? pages.map((page, index) => /*#__PURE__*/React.createElement(PageListItem, {
    key: index,
    page: page
  })) : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "page-list"
  }, items);
};

export default PageList;