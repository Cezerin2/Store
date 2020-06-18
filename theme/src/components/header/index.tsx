import Lscache from "lscache"
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { text } from "../../lib/settings"
import Cart from "./cart"
import CartIndicator from "./cartIndicator"
import HeadMenu from "./headMenu"
import Login from "./login"
import SearchBox from "./searchBox"

const Logo = ({ src, onClick, alt }) => (
  <NavLink className="logo-image" to="/" onClick={onClick}>
    <img src={src} alt={alt} />
  </NavLink>
)

const BurgerButton = ({ onClick, className }) => (
  <span className={className} onClick={onClick}>
    <span />
    <span />
    <span />
  </span>
)

const BackButton = ({ onClick }) => (
  <span
    className="navbar-item is-hidden-tablet is-flex-mobile"
    onClick={onClick}
  >
    <img
      className="icon"
      src="/assets/images/arrow_back.svg"
      style={{ width: 18 }}
    />
  </span>
)

const Header = props => {
  const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false)
  const [mobileSearchIsActive, setMobileSearchIsActive] = useState(false)
  const [cartIsActive, setCartIsActive] = useState(false)

  //componentWillReceiveProps(nextProps) {
  useEffect(
    nextProps => {
      if (
        props.cart !== nextProps.cart &&
        props.currentPage.path !== "/checkout"
      ) {
        showCart()
      }
    },
    [nextProps]
  )

  const menuToggle = () => {
    setMobileMenuIsActive(!mobileMenuIsActive)
    setCartIsActive(false)
    document.body.classList.toggle("noscroll")
  }

  const searchToggle = () => {
    setMobileSearchIsActive(!mobileSearchIsActive)
    document.body.classList.toggle("search-active")
  }

  const menuClose = () => {
    setMobileMenuIsActive(false)
    document.body.classList.remove("noscroll")
  }

  const closeAll = () => {
    setCartIsActive(false)
    setMobileMenuIsActive(false)
    document.body.classList.remove("noscroll")
  }

  const cartToggle = () => {
    setCartIsActive(!cartIsActive)
    setMobileMenuIsActive(false)

    if (props.cart && props.cart.items && props.cart.items.length > 0) {
      props.cartLayerInitialized({
        cartlayerBtnInitialized: true,
      })
    }
    document.body.classList.toggle("noscroll")
  }

  const showCart = () => {
    setCartIsActive(true)
    setMobileMenuIsActive(false)
    document.body.classList.add("noscroll")
  }

  const handleLogin = () => {
    Lscache.flushExpired()
    if (Lscache.get("auth_data") === null) {
      props.loggedinUserTimeUp({
        authenticated: false,
      })
      props.setLocation("/login")
    } else {
      props.customerData({
        token: Lscache.get("auth_data"),
      })
      props.setLocation("/customer-account")
    }
  }

  const handleSearch = search => {
    if (props.currentPage.path === "/search") {
      props.setSearch(search)
    } else if (search && search !== "") {
      props.setLocation(`/search?search=${search}`)
    }
  }

  const handleGoBack = () => {
    closeAll()
    props.goBack()
  }

  const {
    categories,
    cart,
    settings,
    currentPage,
    location,
    productFilter,
    cartlayerBtnInitialized,
  } = props.state

  const classToggle = mobileMenuIsActive
    ? "navbar-burger is-hidden-tablet is-active"
    : "navbar-burger is-hidden-tablet"
  const showBackButton = currentPage.type === "product" && location.hasHistory

  return (
    <>
      <header className={mobileSearchIsActive ? "search-active" : ""}>
        <div className="container">
          <div className="columns is-gapless is-mobile header-container">
            <div className="column is-4 column-burger">
              {!showBackButton && (
                <BurgerButton onClick={menuToggle} className={classToggle} />
              )}
              {showBackButton && <BackButton onClick={handleGoBack} />}
            </div>

            <div className="column is-4 has-text-centered column-logo">
              <Logo src={settings.logo} onClick={closeAll} alt="logo" />
            </div>

            <div className="column is-4 has-text-right header-block-right">
              <span
                className="icon icon-search is-hidden-tablet"
                onClick={searchToggle}
              >
                <img
                  src="/assets/images/search.svg"
                  alt={text.search}
                  title={text.search}
                  style={{ minWidth: 24 }}
                />
              </span>
              <SearchBox
                value={productFilter.search}
                onSearch={handleSearch}
                className={mobileSearchIsActive ? "search-active" : ""}
              />
              <Login onClick={handleLogin} />
              <CartIndicator
                cart={cart}
                onClick={cartToggle}
                cartIsActive={cartIsActive}
                cartlayerBtnInitialized={cartlayerBtnInitialized}
              />
              <div className={cartIsActive ? "mini-cart-open" : ""}>
                <Cart
                  cart={cart}
                  deleteCartItem={props.deleteCartItem}
                  settings={settings}
                  cartToggle={cartToggle}
                  cartlayerBtnInitialized={cartlayerBtnInitialized}
                />
              </div>
            </div>
          </div>

          <div className="primary-nav is-hidden-mobile">
            <HeadMenu
              categories={categories}
              location={location}
              isMobile={false}
            />
          </div>
        </div>
      </header>

      <div
        className={mobileMenuIsActive || cartIsActive ? "dark-overflow" : ""}
        onClick={closeAll}
      />
      <div
        className={`mobile-nav is-hidden-tablet${
          mobileMenuIsActive ? " mobile-nav-open" : ""
        }`}
      >
        <HeadMenu
          isMobile={true}
          categories={categories}
          location={location}
          onClick={menuClose}
        />
      </div>
    </>
  )
}

export default Header
