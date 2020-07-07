import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Register from "../components/src/shared/containers/register"

const RegisterPage = () => (
  <Layout>
    <SEO title="Register" />
    <Register />
  </Layout>
)

export default RegisterPage
