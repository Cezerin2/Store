import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Page from "../components/src/shared/containers"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Page />
  </Layout>
)

export default IndexPage
