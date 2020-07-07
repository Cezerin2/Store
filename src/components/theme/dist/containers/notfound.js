import React from "react";
import { text } from "../lib/settings";
import MetaTags from "../components/metaTags";

const NotFoundContainer = () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetaTags, {
  title: text.title404
}), /*#__PURE__*/React.createElement("section", {
  className: "section"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "content"
}, /*#__PURE__*/React.createElement("h1", null, text.title404), text.text404))));

export default NotFoundContainer;