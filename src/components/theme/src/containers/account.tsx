import React from "react"
import Account from "../components/account/index"
import MetaTags from "../components/metaTags"

const AccountContainer = props => {
  const {
    state: { pageDetails, loginUser },
  } = props

  return (
    <>
      <MetaTags
        title={pageDetails.meta_title}
        description={pageDetails.meta_description}
        canonicalUrl={pageDetails.url}
        ogTitle={pageDetails.meta_title}
        ogDescription={pageDetails.meta_description}
      />
      <section className="section">
        <div className="container">
          <div className="content">
            <Account {...props} />
          </div>
        </div>
      </section>
    </>
  )
}

export default AccountContainer
