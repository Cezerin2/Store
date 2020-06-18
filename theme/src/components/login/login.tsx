import Lscache from "lscache"
import React, { useState } from "react"
import { Link, NavLink, Redirect } from "react-router-dom"
import { Field, reduxForm } from "redux-form"
import { text } from "../../lib/settings"

const validateRequired = value =>
  value && value.length > 0 ? undefined : text.required

const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? text.emailInvalid
    : undefined

const ReadOnlyField = ({ name, value }) => (
  <div className="checkout-field-preview">
    <div className="name">{name}</div>
    <div className="value">{value}</div>
  </div>
)

const InputField = field => (
  <div className={field.className}>
    <label htmlFor={field.id}>
      {field.label}
      {field.meta.touched && field.meta.error && (
        <span className="error">{field.meta.error}</span>
      )}
    </label>
    <input
      {...field.input}
      placeholder={field.placeholder}
      type={field.type}
      id={field.id}
      className={field.meta.touched && field.meta.error ? "invalid" : ""}
    />
  </div>
)

const Login = props => {
  const [unauthorized, setUnauthorized] = useState(false)

  function verifyAuth() {
    setUnauthorized(true)
  }

  const getField = fieldName => {
    const fields = props.checkoutFields || []
    const field = fields.find(item => item.name === fieldName)
    return field
  }

  const getFieldStatus = fieldName => {
    const field = getField(fieldName)
    return field && field.status ? field.status : "required"
  }

  const isFieldOptional = fieldName => getFieldStatus(fieldName) === "optional"

  const isFieldHidden = fieldName => getFieldStatus(fieldName) === "hidden"

  const getFieldValidators = fieldName => {
    const isOptional = isFieldOptional(fieldName)
    const validatorsArray = []
    if (!isOptional) {
      validatorsArray.push(validateRequired)
    }
    if (fieldName === "email") {
      validatorsArray.push(validateEmail)
    }

    return validatorsArray
  }

  const getFieldPlaceholder = fieldName => {
    const field = getField(fieldName)
    return field && field.placeholder && field.placeholder.length > 0
      ? field.placeholder
      : ""
  }

  const getFieldLabelText = fieldName => {
    const field = getField(fieldName)
    if (field && field.label && field.label.length > 0) {
      return field.label
    }
    switch (fieldName) {
      case "email":
        return text.email
      case "password":
        return text.password
      default:
        return "Unnamed field"
    }
  }

  const getFieldLabel = fieldName => {
    const labelText = getFieldLabelText(fieldName)
    return isFieldOptional(fieldName)
      ? `${labelText} (${text.optional})`
      : labelText
  }

  const { handleSubmit } = props

  if (
    props.customerProperties !== undefined &&
    Lscache.get("auth_data") !== null
  ) {
    return (
      <Redirect
        to={{
          pathname: "/customer-account",
        }}
      />
    )
  }

  if (props.customerProperties !== undefined) {
    if (!props.customerProperties.authenticated) {
      if (!unauthorized) {
        verifyAuth()
      }
    }
  }

  const inputClassName = "login-input-field"
  const titleClassName = "login-title"
  const loginButtonClass = "account-button button"
  const loginSectionGuest = "login-section-guest"
  const errorAlertText = "error-alert-text"
  const loginForm =
    props.cartlayerBtnInitialized !== undefined && props.cartlayerBtnInitialized
      ? "login-form login-form login-form-with-guest"
      : "login-form"

  return (
    <div className="login-container">
      {props.cartlayerBtnInitialized !== undefined &&
        props.cartlayerBtnInitialized && (
          <div className="login-guest-checkout">
            <div className={loginSectionGuest}>
              <h2>{text.continue_guest_headline}</h2>
              <p>{text.continue_guest_text}</p>
              <div className="login-button-wrap">
                <NavLink
                  className="button loginButtonClass"
                  style={{ textTransform: "uppercase" }}
                  to="/checkout"
                >
                  {text.proceedToCheckout}
                </NavLink>
              </div>
            </div>
          </div>
        )}
      <form onSubmit={handleSubmit} className={loginForm}>
        <div className="login-section">
          <h2 className={titleClassName}>{text.login_title}</h2>
          {props.customerProperties !== undefined &&
          props.customerProperties.loggedin_failed ? (
            <p className={errorAlertText}>{text.login_failed}</p>
          ) : (
            ""
          )}
          {!isFieldHidden("email") && (
            <Field
              className={inputClassName}
              name="email"
              id="customer.email"
              component={InputField}
              type="email"
              label={getFieldLabel("email")}
              validate={getFieldValidators("email")}
              placeholder={getFieldPlaceholder("email")}
            />
          )}

          {!isFieldHidden("password") && (
            <Field
              className={inputClassName}
              name="password"
              id="customer.password"
              component={InputField}
              type="password"
              label={getFieldLabel("password")}
              validate={getFieldValidators("password")}
              placeholder={getFieldPlaceholder("password")}
            />
          )}
          <div className="login-link-wrap">
            <Link to="/forgot-password">{text.forgot_password}</Link>
          </div>
          <div className="login-button-wrap">
            <button type="submit" className={loginButtonClass}>
              {text.login}
            </button>
          </div>

          <NavLink className="logo-image" to="/register">
            <div className="login-button-wrap">
              <button
                type="button"
                className={loginButtonClass}
                onClick={switchRegister}
              >
                {text.register}
              </button>
            </div>
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: "Login",
})(Login)
