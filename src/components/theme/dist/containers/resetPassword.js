import React from "react";
import { themeSettings, text } from "../lib/settings";
import MetaTags from "../components/metaTags";
import ResetPassword from "../components/resetPassword/index";

const ResetPasswordContainer = props => {
  const {
    state: {
      pageDetails,
      loginUser
    }
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement(ResetPassword, props)))));
};

export default ResetPasswordContainer;