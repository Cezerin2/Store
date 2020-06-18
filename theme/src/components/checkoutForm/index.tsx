import Lscache from "lscache"
import React, { useEffect, useState } from "react"
import { text, themeSettings } from "../../lib/settings"
import CheckoutStepContacts from "./stepContacts"
import CheckoutStepPayment from "./stepPayment"
import CheckoutStepShipping from "./stepShipping"

const CheckoutForm = props => {
  const [step, setStep] = useState(1)

  useEffect(() => {
    props.loadShippingMethods()
    props.loadPaymentMethods()
    props.customerData({
      token: Lscache.get("auth_data"),
    })

    props.cartLayerInitialized({
      cartlayerBtnInitialized: false,
    })
  }, [])

  const handleContactsSave = () => {
    setStep(2)
  }

  const handleContactsEdit = () => {
    setStep(1)
  }

  const handleShippingSave = () => {
    setStep(3)
  }

  const handleShippingEdit = () => {
    setStep(2)
  }

  const handleContactsSubmit = values => {
    let { shipping_address, billing_address } = values
    shipping_address = Object.assign(
      { full_name: `${values.first_name} ${values.last_name}` },
      shipping_address
    )
    props.updateCart({
      email: values.email,
      mobile: values.mobile,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
      shipping_address,
      billing_address,
    })

    handleContactsSave()
  }

  const handleLocationSave = shippingLocation => {
    props.updateCart({
      shipping_address: shippingLocation,
      billing_address: shippingLocation,
      payment_method_id: null,
      shipping_method_id: null,
    })
  }

  const handleShippingMethodSave = shippingMethodId => {
    props.updateCart({
      payment_method_id: null,
      shipping_method_id: shippingMethodId,
    })
  }

  const handlePaymentMethodSave = paymentMethodId => {
    props.updateCart({
      payment_method_id: paymentMethodId,
    })
  }

  const isShowPaymentForm = () => {
    const { payment_method_gateway } = props.state.cart
    const paymentGatewayExists =
      payment_method_gateway && payment_method_gateway !== ""
    return paymentGatewayExists
  }

  const handleShippingSubmit = values => {
    if (isShowPaymentForm()) {
      const { shipping_address, billing_address, comments } = values

      props.updateCart({
        shipping_address,
        billing_address,
        comments,
      })
      handleShippingSave()
    } else {
      props.checkout(values)
    }
  }

  const handleSuccessPayment = () => {
    props.checkout(null)
  }

  const handleCheckoutWithToken = tokenId => {
    props.updateCart({
      payment_token: tokenId,
    })
  }

  const {
    settings,
    cart,
    customerProperties,
    paymentMethods,
    shippingMethods,
    loadingShippingMethods,
    loadingPaymentMethods,
    checkoutFields,
    processingCheckout,
    cartlayerBtnInitialized,
  } = props.state

  const {
    checkoutInputClass = "checkout-field",
    checkoutButtonClass = "checkout-button",
    checkoutEditButtonClass = "checkout-button-edit",
  } = themeSettings

  if (cart && cart.items.length > 0) {
    const showPaymentForm = isShowPaymentForm()

    let shippingMethod = null
    let paymentMethod = null
    const { shipping_method_id, payment_method_id } = cart
    if (shipping_method_id && shippingMethods && shippingMethods.length > 0) {
      shippingMethod = shippingMethods.find(
        method => method.id === shipping_method_id
      )
    }
    if (payment_method_id && paymentMethods && paymentMethods.length > 0) {
      paymentMethod = paymentMethods.find(
        method => method.id === payment_method_id
      )
    }

    return (
      <div className="checkout-form">
        <CheckoutStepContacts
          isReadOnly={step > 1}
          title={text.customerDetails}
          inputClassName={checkoutInputClass}
          buttonClassName={checkoutButtonClass}
          editButtonClassName={checkoutEditButtonClass}
          initialValues={cart}
          settings={settings}
          customerProperties={customerProperties}
          paymentMethods={paymentMethods}
          shippingMethod={shippingMethod}
          shippingMethods={shippingMethods}
          loadingShippingMethods={loadingShippingMethods}
          loadingPaymentMethods={loadingPaymentMethods}
          checkoutFields={checkoutFields}
          onEdit={handleContactsEdit}
          onSubmit={handleContactsSubmit}
          saveShippingLocation={handleLocationSave}
          saveShippingMethod={handleShippingMethodSave}
          savePaymentMethod={handlePaymentMethodSave}
          cartlayerBtnInitialized={cartlayerBtnInitialized}
        />

        <CheckoutStepShipping
          show={step >= 2}
          isReadOnly={step > 2}
          title={text.shipping}
          inputClassName={checkoutInputClass}
          buttonClassName={checkoutButtonClass}
          editButtonClassName={checkoutEditButtonClass}
          initialValues={cart}
          settings={settings}
          processingCheckout={processingCheckout}
          shippingMethod={shippingMethod}
          paymentMethod={paymentMethod}
          checkoutFields={checkoutFields}
          showPaymentForm={showPaymentForm}
          onSave={handleShippingSave}
          onEdit={handleShippingEdit}
          onSubmit={handleShippingSubmit}
        />

        {showPaymentForm && (
          <CheckoutStepPayment
            show={step === 3}
            title={text.payment}
            inputClassName={checkoutInputClass}
            buttonClassName={checkoutButtonClass}
            cart={cart}
            settings={settings}
            processingCheckout={processingCheckout}
            handleSuccessPayment={handleSuccessPayment}
            onCreateToken={handleCheckoutWithToken}
          />
        )}
      </div>
    )
  }
  return <p>{text.emptyCheckout}</p>
}

export default CheckoutForm
