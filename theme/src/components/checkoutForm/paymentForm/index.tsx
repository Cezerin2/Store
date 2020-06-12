import React, { useEffect, useState } from "react"
import api from "../../../lib/api"
import LiqPay from "./LiqPay"
import PayPalCheckout from "./PayPalCheckout"
import StripeElements from "./StripeElements"

const PaymentForm = props => {
  const [formSettings, setFormSettings] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchFormSettings = () => {
    setLoading(true)
    api.ajax.paymentFormSettings.retrieve()
    try {
      ;({ status, json }) => {
        setFormSettings(json)
        setLoading(false)
      }
    } catch (error) {
      setFormSettings(null)
      setLoading(false)
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFormSettings()
  }, [])

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.gateway !== props.gateway ||
  //     nextProps.amount !== props.amount
  //   ) {
  //     fetchFormSettings();
  //   }
  // }

  //  function shouldComponentUpdate(nextProps, nextState) {
  //     return (
  //       nextProps.gateway !== props.gateway ||
  //       nextProps.amount !== props.amount ||
  //       state !== nextState
  //     );
  //   }

  const { gateway, shopSettings, onPayment, onCreateToken } = props

  if (loading) {
    return null
  }
  if (formSettings && gateway && gateway !== "") {
    switch (gateway) {
      case "paypal-checkout":
        return (
          <div className="payment-form">
            <PayPalCheckout
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
            />
          </div>
        )
      case "liqpay":
        return (
          <div className="payment-form">
            <LiqPay
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
            />
          </div>
        )
      case "stripe-elements":
        return (
          <div className="payment-form">
            <StripeElements
              formSettings={formSettings}
              shopSettings={shopSettings}
              onPayment={onPayment}
              onCreateToken={onCreateToken}
            />
          </div>
        )
      default:
        return (
          <>
            Payment Gateway <b>{gateway}</b> not found!
          </>
        )
    }
  } else {
    return null
  }
}

export default PaymentForm
