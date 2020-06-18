import React from "react"
import { themeSettings } from "../../lib/settings"
import ForgotPassword from "./forgotPassword"

const ForgotPasswordForm = props => {
  const handleFormSubmit = values => {
    props.forgotPassword({
      email: values.email,
      history: props.history,
    })
  }

  const { settings, forgotPasswordProperties } = props.state

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
  } = themeSettings

  return (
    <>
      <ForgotPassword
        inputClassName={checkoutInputClass}
        buttonClassName={checkoutButtonClass}
        settings={settings}
        forgotPasswordProperties={forgotPasswordProperties}
        onSubmit={handleFormSubmit}
      />
    </>
  )
}

export default ForgotPasswordForm
