import React from "react";
import { NavLink } from "react-router-dom";
import { themeSettings, text } from "../../lib/settings";

const LoginIcon = () => {
  return /*#__PURE__*/React.createElement("img", {
    src: "/assets/images/login.svg",
    className: "login-icon",
    alt: text.login,
    title: text.login,
    style: {
      marginTop: 12 + "px",
      minWidth: 32 + "px",
      minHeight: 29 + "px",
      maxWidth: 44 + "px",
      maxHeight: 28 + "px"
    }
  });
};

class Login extends React.PureComponent {
  render() {
    const {
      login,
      onClick
    } = this.props;
    return /*#__PURE__*/React.createElement("span", {
      className: "login-button",
      onClick: onClick
    }, /*#__PURE__*/React.createElement(LoginIcon, null));
  }

}

export default Login;