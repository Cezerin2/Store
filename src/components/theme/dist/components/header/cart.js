import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import Lscache from "lscache";
import { themeSettings, text } from "../../lib/settings";
import * as helper from "../../lib/helper";

const CartItem = ({
  item,
  deleteCartItem,
  settings
}) => {
  const thumbnail = helper.getThumbnailUrl(item.image_url, themeSettings.cartThumbnailWidth);
  return /*#__PURE__*/React.createElement("div", {
    className: "columns is-mobile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "column is-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, /*#__PURE__*/React.createElement(NavLink, {
    to: item.path
  }, /*#__PURE__*/React.createElement("img", {
    src: thumbnail
  })))), /*#__PURE__*/React.createElement("div", {
    className: "column"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavLink, {
    to: item.path
  }, item.name)), item.variant_name.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "cart-option-name"
  }, item.variant_name), /*#__PURE__*/React.createElement("div", {
    className: "cart-quantity"
  }, text.qty, ": ", item.quantity)), /*#__PURE__*/React.createElement("div", {
    className: "column is-4 has-text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mini-cart-item-price"
  }, helper.formatCurrency(item.price_total, settings)), /*#__PURE__*/React.createElement("a", {
    className: "button is-light is-small",
    onClick: () => deleteCartItem(item.id)
  }, text.remove)));
};

class Cart extends React.PureComponent {
  render() {
    const {
      cart,
      deleteCartItem,
      settings,
      cartToggle
    } = this.props;

    if (cart && cart.items && cart.items.length > 0) {
      const items = cart.items.map(item => /*#__PURE__*/React.createElement(CartItem, {
        key: item.id,
        item: item,
        deleteCartItem: deleteCartItem,
        settings: settings
      }));
      return /*#__PURE__*/React.createElement("div", {
        className: "mini-cart"
      }, items, /*#__PURE__*/React.createElement("hr", {
        className: "separator"
      }), /*#__PURE__*/React.createElement("div", {
        className: "columns is-mobile is-gapless"
      }, /*#__PURE__*/React.createElement("div", {
        className: "column is-7"
      }, /*#__PURE__*/React.createElement("b", null, text.subtotal)), /*#__PURE__*/React.createElement("div", {
        className: "column is-5 has-text-right"
      }, /*#__PURE__*/React.createElement("b", null, helper.formatCurrency(cart.subtotal, settings)))), /*#__PURE__*/React.createElement(NavLink, {
        className: "button is-primary is-fullwidth has-text-centered",
        style: {
          textTransform: "uppercase"
        },
        to: {
          pathname: Lscache.get("auth_data") !== null ? "/checkout" : "/login",
          state: {
            cartLayer: true
          }
        },
        onClick: cartToggle
      }, text.proceedToCheckout));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "mini-cart"
    }, /*#__PURE__*/React.createElement("p", null, text.cartEmpty));
  }

}

export default Cart;