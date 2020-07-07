import React from "react";
import { themeSettings, text } from "../lib/settings";
import MetaTags from "../components/metaTags";
import Account from "../components/account/index";

const AccountContainer = props => {
  const {
    state: {
      pageDetails,
      loginUser
    }
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetaTags, {
    title: pageDetails.meta_title,
    description: pageDetails.meta_description,
    canonicalUrl: pageDetails.url,
    ogTitle: pageDetails.meta_title,
    ogDescription: pageDetails.meta_description
  }), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement(Account, props)))));
};

export default AccountContainer;