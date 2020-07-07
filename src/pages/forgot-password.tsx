import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ForgotPassword from "../components/src/shared/containers/forgotPassword"

const ForgotPasswordPage = () => (
  <Layout>
    <SEO title="ForgotPassword" />
    <ForgotPassword />
  </Layout>
)

export default ForgotPasswordPage
