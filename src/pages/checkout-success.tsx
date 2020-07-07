import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CheckoutSuccess from "../components/src/shared/containers/checkoutSuccess"

const CheckoutSuccessPage = () => (
  <Layout>
    <SEO title="CheckoutSuccess" />
    <CheckoutSuccess />
  </Layout>
)

export default CheckoutSuccessPage
