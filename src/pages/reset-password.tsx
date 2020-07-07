import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ResetPassword from "../components/src/shared/containers/resetPassword"

const ResetPasswordPage = () => (
  <Layout>
    <SEO title="ResetPassword" />
    <ResetPassword />
  </Layout>
)

export default ResetPasswordPage
