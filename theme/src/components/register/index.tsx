import React, { useState } from "react"
import { themeSettings } from "../../lib/settings"
import Register from "./register"

const RegisterForm = props => {
  const [verifiedToken, setVerifiedToken] = useState(false)

  const handleContactsSubmit = values => {
    props.registerUser({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      history: props.history,
    })
  }

  function verifyToken() {
    setVerifiedToken(true)
    props.registerUser({
      token: props.location.search.split("=")[1],
    })
  }

  const { settings, registerProperties } = props.state

  if (
    props.location.search !== "" &&
    props.location.search.indexOf("?token=") !== -1
  ) {
    !verifiedToken ? verifyToken() : ""
  }

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
    checkoutEditButtonClass = "checkout-button-edit",
  } = themeSettings

  return (
    <Register
      inputClassName={checkoutInputClass}
      buttonClassName={checkoutButtonClass}
      editButtonClassName={checkoutEditButtonClass}
      settings={settings}
      registerProperties={registerProperties}
      onSubmit={handleContactsSubmit}
    />
  )
}

export default RegisterForm
