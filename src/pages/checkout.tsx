import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Checkout from "../components/src/shared/containers/checkout"

const CheckoutPage = () => (
  <Layout>
    <SEO title="Checkout" />
    <Checkout />
  </Layout>
)

export default CheckoutPage
