import React from "react";
import { themeSettings, text } from "../lib/settings";
import MetaTags from "../components/metaTags";
import Register from "../components/register";

const RegisterContainer = props => {
  const {
    state: {
      pageDetails,
      settings
    }
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement(Register, props)))));
};

export default RegisterContainer;