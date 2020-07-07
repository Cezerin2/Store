function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link, Redirect, NavLink } from "react-router-dom";
import Lscache from "lscache";
import { themeSettings, text } from "../../lib/settings";

const validateRequired = value => value && value.length > 0 ? undefined : text.required;

const validateEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? text.emailInvalid : undefined;

const ReadOnlyField = ({
  name,
  value
}) => /*#__PURE__*/React.createElement("div", {
  className: "checkout-field-preview"
}, /*#__PURE__*/React.createElement("div", {
  className: "name"
}, name), /*#__PURE__*/React.createElement("div", {
  className: "value"
}, value));

const InputField = field => /*#__PURE__*/React.createElement("div", {
  className: field.className
}, /*#__PURE__*/React.createElement("label", {
  htmlFor: field.id
}, field.label, field.meta.touched && field.meta.error && /*#__PURE__*/React.createElement("span", {
  className: "error"
}, field.meta.error)), /*#__PURE__*/React.createElement("input", _extends({}, field.input, {
  placeholder: field.placeholder,
  type: field.type,
  id: field.id,
  className: field.meta.touched && field.meta.error ? "invalid" : ""
})));

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.getField = fieldName => {
      const fields = this.props.checkoutFields || [];
      const field = fields.find(item => item.name === fieldName);
      return field;
    };

    this.getFieldStatus = fieldName => {
      const field = this.getField(fieldName);
      return field && field.status ? field.status : "required";
    };

    this.isFieldOptional = fieldName => this.getFieldStatus(fieldName) === "optional";

    this.isFieldHidden = fieldName => this.getFieldStatus(fieldName) === "hidden";

    this.getFieldValidators = fieldName => {
      const isOptional = this.isFieldOptional(fieldName);
      const validatorsArray = [];

      if (!isOptional) {
        validatorsArray.push(validateRequired);
      }

      if (fieldName === "email") {
        validatorsArray.push(validateEmail);
      }

      return validatorsArray;
    };

    this.getFieldPlaceholder = fieldName => {
      const field = this.getField(fieldName);
      return field && field.placeholder && field.placeholder.length > 0 ? field.placeholder : "";
    };

    this.getFieldLabelText = fieldName => {
      const field = this.getField(fieldName);

      if (field && field.label && field.label.length > 0) {
        return field.label;
      }

      switch (fieldName) {
        case "email":
          return text.email;
          break;

        case "password":
          return text.password;
          break;

        default:
          return "Unnamed field";
      }
    };

    this.getFieldLabel = fieldName => {
      const labelText = this.getFieldLabelText(fieldName);
      return this.isFieldOptional(fieldName) ? `${labelText} (${text.optional})` : labelText;
    };

    this.state = {
      unauthorized: false
    };
  }

  verifyAuth() {
    this.setState({
      unauthorized: true
    });
  }

  render() {
    const {
      handleSubmit,
      customerProperties,
      cartlayerBtnInitialized
    } = this.props;

    if (this.props.customerProperties !== undefined && Lscache.get("auth_data") !== null) {
      return /*#__PURE__*/React.createElement(Redirect, {
        to: {
          pathname: "/customer-account"
        }
      });
    }

    if (this.props.customerProperties !== undefined) {
      if (!this.props.customerProperties.authenticated) {
        if (!this.state.unauthorized) {
          this.verifyAuth();
        }
      }
    }

    const inputClassName = "login-input-field";
    const titleClassName = "login-title";
    const loginButtonClass = "account-button button";
    const loginSectionGuest = "login-section-guest";
    const errorAlertText = "error-alert-text";
    const loginForm = this.props.cartlayerBtnInitialized !== undefined && this.props.cartlayerBtnInitialized ? "login-form login-form login-form-with-guest" : "login-form";
    return /*#__PURE__*/React.createElement("div", {
      className: "login-container"
    }, this.props.cartlayerBtnInitialized !== undefined && this.props.cartlayerBtnInitialized && /*#__PURE__*/React.createElement("div", {
      className: "login-guest-checkout"
    }, /*#__PURE__*/React.createElement("div", {
      className: loginSectionGuest
    }, /*#__PURE__*/React.createElement("h2", null, text.continue_guest_headline), /*#__PURE__*/React.createElement("p", null, text.continue_guest_text), /*#__PURE__*/React.createElement("div", {
      className: "login-button-wrap"
    }, /*#__PURE__*/React.createElement(NavLink, {
      className: "button loginButtonClass",
      style: {
        textTransform: "uppercase"
      },
      to: "/checkout"
    }, text.proceedToCheckout)))), /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit,
      className: loginForm
    }, /*#__PURE__*/React.createElement("div", {
      className: "login-section"
    }, /*#__PURE__*/React.createElement("h2", {
      className: titleClassName
    }, text.login_title), this.props.customerProperties !== undefined && this.props.customerProperties.loggedin_failed ? /*#__PURE__*/React.createElement("p", {
      className: errorAlertText
    }, text.login_failed) : "", !this.isFieldHidden("email") && /*#__PURE__*/React.createElement(Field, {
      className: inputClassName,
      name: "email",
      id: "customer.email",
      component: InputField,
      type: "email",
      label: this.getFieldLabel("email"),
      validate: this.getFieldValidators("email"),
      placeholder: this.getFieldPlaceholder("email")
    }), !this.isFieldHidden("password") && /*#__PURE__*/React.createElement(Field, {
      className: inputClassName,
      name: "password",
      id: "customer.password",
      component: InputField,
      type: "password",
      label: this.getFieldLabel("password"),
      validate: this.getFieldValidators("password"),
      placeholder: this.getFieldPlaceholder("password")
    }), /*#__PURE__*/React.createElement("div", {
      className: "login-link-wrap"
    }, /*#__PURE__*/React.createElement(Link, {
      to: "/forgot-password"
    }, text.forgot_password)), /*#__PURE__*/React.createElement("div", {
      className: "login-button-wrap"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: loginButtonClass
    }, text.login)), /*#__PURE__*/React.createElement(NavLink, {
      className: "logo-image",
      to: "/register"
    }, /*#__PURE__*/React.createElement("div", {
      className: "login-button-wrap"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: loginButtonClass,
      onClick: this.switchRegister
    }, text.register))))));
  }

}

export default reduxForm({
  form: "Login"
})(Login);