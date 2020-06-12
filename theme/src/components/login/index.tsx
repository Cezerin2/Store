import Lscache from "lscache"
import React from "react"
import { themeSettings } from "../../lib/settings"
import Login from "./login"

const LoginForm = props => {
  const handleFormSubmit = values => {
    let cartLayer = false
    if (props.location !== undefined && props.location.state !== undefined) {
      if (props.location.state.cartLayer && Lscache.get("auth_data") === null) {
        cartLayer = true
      }
    }

    props.loginUser({
      email: values.email,
      password: values.password,
      history: props.history,
      cartLayer,
    })
  }

  const { settings, customerProperties, cartlayerBtnInitialized } = props.state

  if (props.state.customerProperties !== undefined) {
    if (props.state.customerProperties.authenticated) {
      const expiryMilliseconds = 1000 // time units is seconds
      Lscache.setExpiryMilliseconds(expiryMilliseconds)
      Lscache.set("auth_data", props.state.customerProperties.token, 6000)
      Lscache.set("customer_data", props.state.customerProperties, 6000)
    }
  }

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
    checkoutEditButtonClass = "checkout-button-edit",
  } = themeSettings

  return (
    <Login
      inputClassName={checkoutInputClass}
      buttonClassName={checkoutButtonClass}
      editButtonClassName={checkoutEditButtonClass}
      settings={settings}
      customerProperties={customerProperties}
      cartlayerBtnInitialized={cartlayerBtnInitialized}
      readOnly={true}
      onSubmit={handleFormSubmit}
    />
  )
}

export default LoginForm
