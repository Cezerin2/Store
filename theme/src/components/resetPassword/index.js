import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { themeSettings } from "../../lib/settings"
import ResetPassword from "./resetPassword"

const ResetPasswordForm = props => {
  const [verifiedToken, setVerifiedToken] = useState(false)

  function verifyToken() {
    setVerifiedToken(true)
    props.resetPassword({
      token: props.location.search.split("=")[1],
    })
  }

  const handleFormSubmit = values => {
    const userId = props.state.resetPasswordProperties.id
    props.resetPassword({
      id: userId,
      password: values.password,
      history: props.history,
    })
  }

  !verifiedToken ? verifyToken() : ""

  const {
    settings,
    forgotPasswordProperties,
    resetPasswordProperties,
  } = props.state

  if (
    props.location.search === "" ||
    props.location.search.indexOf("?token=") === -1 ||
    (resetPasswordProperties && !resetPasswordProperties.status)
  ) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    )
  }

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
  } = themeSettings

  return (
    <>
      {resetPasswordProperties && (
        <ResetPassword
          inputClassName={checkoutInputClass}
          buttonClassName={checkoutButtonClass}
          settings={settings}
          forgotPasswordProperties={forgotPasswordProperties}
          resetPasswordProperties={resetPasswordProperties}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  )
}

export default ResetPasswordForm
