import React from "react";
import { themeSettings, text } from "../../lib/settings";
import * as helper from "../../lib/helper";

const ItemTags = ({
  tags
}) => {
  if (tags && tags.length > 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "tags"
    }, tags.map((tag, index) => /*#__PURE__*/React.createElement("span", {
      key: index,
      className: "tag"
    }, tag)));
  }

  return null;
};

export default ItemTags;