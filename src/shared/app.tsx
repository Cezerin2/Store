import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Route } from "react-router"
import { animateScroll } from "react-scroll"
import { setCurrentPage } from "./actions"
import AccountContainer from "./containers/account"
import CategoryContainer from "./containers/category"
import CheckoutContainer from "./containers/checkout"
import CheckoutSuccessContainer from "./containers/checkoutSuccess"
import ForgotPasswordContainer from "./containers/forgotPassword"
import IndexContainer from "./containers/index"
import LoginContainer from "./containers/login"
import NotFoundContainer from "./containers/notfound"
import PageContainer from "./containers/page"
import ProductContainer from "./containers/product"
import RegisterContainer from "./containers/register"
import ResetPasswordContainer from "./containers/resetPassword"
import SearchContainer from "./containers/search"
import SharedContainer from "./containers/shared"
import { PAGE, PRODUCT, PRODUCT_CATEGORY, RESERVED, SEARCH } from "./pageTypes"

const SwitchContainers = props => {
  //componentWillReceiveProps(nextProps) {
  useEffect(
    nextProps => {
      props.setCurrentPage(nextProps.location)

      if (nextProps.location && props.location) {
        const pathnameChanged =
          nextProps.location.pathname !== props.location.pathname
        const queryChanged = nextProps.location.search !== props.location.search
        const isSearchPage = nextProps.location.pathname === "/search"

        if (pathnameChanged || (queryChanged && isSearchPage)) {
          animateScroll.scrollToTop({
            duration: 500,
            delay: 100,
            smooth: true,
          })
        }
      }
    },
    [props]
  )

  const { location, currentPage } = props
  const locationPathname =
    location && location.pathname ? location.pathname : "/"
  switch (currentPage.type) {
    case PRODUCT:
      return <ProductContainer />
    case PRODUCT_CATEGORY:
      return <CategoryContainer />
    case SEARCH:
      return <SearchContainer />
    case RESERVED:
    case PAGE:
      if (locationPathname === "/login") {
        return <LoginContainer />
      }
      if (locationPathname === "/register") {
        return <RegisterContainer />
      }
      if (locationPathname === "/customer-account") {
        return <AccountContainer />
      }
      if (locationPathname === "/forgot-password") {
        return <ForgotPasswordContainer />
      }
      if (locationPathname === "/reset-password") {
        return <ResetPasswordContainer />
      }
      if (locationPathname === "/") {
        return <IndexContainer />
      }
      if (locationPathname === "/checkout") {
        return <CheckoutContainer />
      }
      if (locationPathname === "/checkout-success") {
        return <CheckoutSuccessContainer />
      }
      return <PageContainer />

    default:
      return <NotFoundContainer />
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentPage: state.app.currentPage,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentPage: location => {
    dispatch(setCurrentPage(location))
  },
})

const SwitchContainersConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchContainers)

const App = () => (
  <SharedContainer>
    <Route component={SwitchContainersConnected} />
  </SharedContainer>
)

export default App
