import Lscache from "lscache"
import React from "react"
import { Redirect } from "react-router-dom"
import { themeSettings } from "../../lib/settings"
import Account from "./account"

const AccountForm = props => {
  const handlecustomerProperties = () => {
    props.customerData({
      token: Lscache.get("auth_data"),
    })
  }

  const handleFormSubmit = values => {
    const { shipping_address, billing_address } = values
    props.changecustomerProperties({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      token: Lscache.get("auth_data"),
      shipping_address,
      billing_address,
      history: props.history,
    })

    props.updateCart({
      shipping_address,
      billing_address,
      payment_method_id: null,
      shipping_method_id: null,
    })
  }

  const {
    settings,
    customerProperties,
    initialValues,
    cartlayerBtnInitialized,
  } = props.state

  Lscache.flushExpired()

  if (Lscache.get("auth_data") === null && customerProperties === undefined) {
    Lscache.flush()
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    )
  }
  const cacheTimeStamp = localStorage.getItem(
    "lscache-auth_data-cacheexpiration"
  )
  if (Number(cacheTimeStamp) <= Math.floor(new Date().getTime() / 1000)) {
    Lscache.flush()
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    )
  }

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
    checkoutEditButtonClass = "checkout-button-edit",
  } = themeSettings

  return (
    <Account
      inputClassName={checkoutInputClass}
      buttonClassName={checkoutButtonClass}
      editButtonClassName={checkoutEditButtonClass}
      settings={settings}
      customerProperties={customerProperties || handlecustomerProperties()}
      initialValues={initialValues}
      cartlayerBtnInitialized={cartlayerBtnInitialized}
      onSubmit={handleFormSubmit}
    />
  )
}

export default AccountForm
