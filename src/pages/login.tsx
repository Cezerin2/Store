import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Login from "../components/src/shared/containers/login"

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
    <Login />
  </Layout>
)

export default LoginPage
