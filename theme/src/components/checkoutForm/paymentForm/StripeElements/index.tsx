import React, { useEffect, useState } from "react"
import { StripeProvider } from "react-stripe-elements"
import StoreCheckout from "./StoreCheckout"

const StripeElements = props => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    const SCRIPT_URL = "https://js.stripe.com/v3/"
    const container = document.body || document.head
    const script = document.createElement("script")
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => {
      setStripe(window.Stripe(props.formSettings.public_key))
    }
    container.appendChild(script)
  }, [])

  const { formSettings, shopSettings, onPayment, onCreateToken } = props
  return (
    <StripeProvider stripe={stripe}>
      <StoreCheckout
        formSettings={formSettings}
        shopSettings={shopSettings}
        onPayment={onPayment}
        onCreateToken={onCreateToken}
      />
    </StripeProvider>
  )
}

export default StripeElements
