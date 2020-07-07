import React from "react";
import { NavLink } from "react-router-dom";
import Lscache from "lscache";
import { themeSettings, text } from "../../lib/settings";
import Cart from "./cart";
import CartIndicator from "./cartIndicator";
import Login from "./login";
import SearchBox from "./searchBox";
import HeadMenu from "./headMenu";

const Logo = ({
  src,
  onClick,
  alt
}) => /*#__PURE__*/React.createElement(NavLink, {
  className: "logo-image",
  to: "/",
  onClick: onClick
}, /*#__PURE__*/React.createElement("img", {
  src: src,
  alt: alt
}));

const BurgerButton = ({
  onClick,
  className
}) => /*#__PURE__*/React.createElement("span", {
  className: className,
  onClick: onClick
}, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null));

const BackButton = ({
  onClick
}) => /*#__PURE__*/React.createElement("span", {
  className: "navbar-item is-hidden-tablet is-flex-mobile",
  onClick: onClick
}, /*#__PURE__*/React.createElement("img", {
  className: "icon",
  src: "/assets/images/arrow_back.svg",
  style: {
    width: 18
  }
}));

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.menuToggle = () => {
      this.setState({
        mobileMenuIsActive: !this.state.mobileMenuIsActive,
        cartIsActive: false
      });
      document.body.classList.toggle("noscroll");
    };

    this.searchToggle = () => {
      this.setState({
        mobileSearchIsActive: !this.state.mobileSearchIsActive
      });
      document.body.classList.toggle("search-active");
    };

    this.menuClose = () => {
      this.setState({
        mobileMenuIsActive: false
      });
      document.body.classList.remove("noscroll");
    };

    this.closeAll = () => {
      this.setState({
        cartIsActive: false,
        mobileMenuIsActive: false
      });
      document.body.classList.remove("noscroll");
    };

    this.cartToggle = () => {
      this.setState({
        cartIsActive: !this.state.cartIsActive,
        mobileMenuIsActive: false
      });

      if (this.props.state.cart && this.props.state.cart.items && this.props.state.cart.items.length > 0) {
        this.props.cartLayerInitialized({
          cartlayerBtnInitialized: true
        });
      }

      document.body.classList.toggle("noscroll");
    };

    this.showCart = () => {
      this.setState({
        cartIsActive: true,
        mobileMenuIsActive: false
      });
      document.body.classList.add("noscroll");
    };

    this.handleLogin = () => {
      Lscache.flushExpired();

      if (Lscache.get("auth_data") === null) {
        this.props.loggedinUserTimeUp({
          authenticated: false
        });
        this.props.setLocation("/login");
      } else {
        this.props.customerData({
          token: Lscache.get("auth_data")
        });
        this.props.setLocation("/customer-account");
      }
    };

    this.handleSearch = search => {
      if (this.props.state.currentPage.path === "/search") {
        this.props.setSearch(search);
      } else if (search && search !== "") {
        this.props.setLocation(`/search?search=${search}`);
      }
    };

    this.handleGoBack = () => {
      this.closeAll();
      this.props.goBack();
    };

    this.state = {
      mobileMenuIsActive: false,
      mobileSearchIsActive: false,
      cartIsActive: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.state.cart !== nextProps.state.cart && this.props.state.currentPage.path !== "/checkout") {
      this.showCart();
    }
  }

  render() {
    const {
      categories,
      cart,
      settings,
      currentPage,
      location,
      productFilter,
      cartlayerBtnInitialized
    } = this.props.state;
    const classToggle = this.state.mobileMenuIsActive ? "navbar-burger is-hidden-tablet is-active" : "navbar-burger is-hidden-tablet";
    const showBackButton = currentPage.type === "product" && location.hasHistory;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: this.state.mobileSearchIsActive ? "search-active" : ""
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "columns is-gapless is-mobile header-container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column is-4 column-burger"
    }, !showBackButton && /*#__PURE__*/React.createElement(BurgerButton, {
      onClick: this.menuToggle,
      className: classToggle
    }), showBackButton && /*#__PURE__*/React.createElement(BackButton, {
      onClick: this.handleGoBack
    })), /*#__PURE__*/React.createElement("div", {
      className: "column is-4 has-text-centered column-logo"
    }, /*#__PURE__*/React.createElement(Logo, {
      src: settings.logo,
      onClick: this.closeAll,
      alt: "logo"
    })), /*#__PURE__*/React.createElement("div", {
      className: "column is-4 has-text-right header-block-right"
    }, /*#__PURE__*/React.createElement("span", {
      className: "icon icon-search is-hidden-tablet",
      onClick: this.searchToggle
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/images/search.svg",
      alt: text.search,
      title: text.search,
      style: {
        minWidth: 24
      }
    })), /*#__PURE__*/React.createElement(SearchBox, {
      value: productFilter.search,
      onSearch: this.handleSearch,
      className: this.state.mobileSearchIsActive ? "search-active" : ""
    }), /*#__PURE__*/React.createElement(Login, {
      onClick: this.handleLogin
    }), /*#__PURE__*/React.createElement(CartIndicator, {
      cart: cart,
      onClick: this.cartToggle,
      cartIsActive: this.state.cartIsActive,
      cartlayerBtnInitialized: cartlayerBtnInitialized
    }), /*#__PURE__*/React.createElement("div", {
      className: this.state.cartIsActive ? "mini-cart-open" : ""
    }, /*#__PURE__*/React.createElement(Cart, {
      cart: cart,
      deleteCartItem: this.props.deleteCartItem,
      settings: settings,
      cartToggle: this.cartToggle,
      cartlayerBtnInitialized: cartlayerBtnInitialized
    })))), /*#__PURE__*/React.createElement("div", {
      className: "primary-nav is-hidden-mobile"
    }, /*#__PURE__*/React.createElement(HeadMenu, {
      categories: categories,
      location: location,
      isMobile: false
    })))), /*#__PURE__*/React.createElement("div", {
      className: this.state.mobileMenuIsActive || this.state.cartIsActive ? "dark-overflow" : "",
      onClick: this.closeAll
    }), /*#__PURE__*/React.createElement("div", {
      className: `mobile-nav is-hidden-tablet${this.state.mobileMenuIsActive ? " mobile-nav-open" : ""}`
    }, /*#__PURE__*/React.createElement(HeadMenu, {
      isMobile: true,
      categories: categories,
      location: location,
      onClick: this.menuClose
    })));
  }

}

export default Header;