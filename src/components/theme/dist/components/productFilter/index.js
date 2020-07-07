import React from "react";
import { NavLink } from "react-router-dom";
import { themeSettings, text } from "../../lib/settings";
import Sort from "../sort";
import PriceSlider from "./priceSlider";
import AttributeFilter from "./attributeFilter";

class ProductFilter extends React.Component {
  constructor(props) {
    super(props);

    this.sidebarToggle = () => {
      this.setState({
        sidebarIsActive: !this.state.sidebarIsActive
      });
      document.body.classList.toggle("noscroll");
    };

    this.sidebarClose = () => {
      this.setState({
        sidebarIsActive: false
      });
      document.body.classList.remove("noscroll");
    };

    this.state = {
      sidebarIsActive: false
    };
  }

  render() {
    const {
      sidebarIsActive
    } = this.state;
    const {
      categoryDetails,
      categories,
      settings,
      productFilter,
      productsMinPrice,
      productsMaxPrice,
      productsAttributes
    } = this.props.state;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "is-hidden-tablet"
    }, /*#__PURE__*/React.createElement("button", {
      className: "button is-fullwidth",
      onClick: this.sidebarToggle
    }, text.filterProducts)), /*#__PURE__*/React.createElement("div", {
      className: sidebarIsActive ? "modal is-active" : "is-hidden-mobile",
      style: {
        zIndex: 101
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: sidebarIsActive ? "dark-overflow" : "",
      onClick: this.sidebarClose
    }), /*#__PURE__*/React.createElement("div", {
      className: sidebarIsActive ? "modal-content" : ""
    }, /*#__PURE__*/React.createElement("div", {
      className: sidebarIsActive ? "box sidebar" : ""
    }, /*#__PURE__*/React.createElement("div", {
      className: "is-hidden-tablet",
      style: {
        marginBottom: 30
      }
    }, /*#__PURE__*/React.createElement(Sort, {
      defaultSort: settings.default_product_sorting,
      currentSort: productFilter.sort,
      setSort: this.props.setSort
    })), /*#__PURE__*/React.createElement(AttributeFilter, {
      attributes: productsAttributes,
      setFilterAttribute: this.props.setFilterAttribute,
      unsetFilterAttribute: this.props.unsetFilterAttribute
    }), /*#__PURE__*/React.createElement(PriceSlider, {
      minPrice: productsMinPrice,
      maxPrice: productsMaxPrice,
      minValue: productFilter.priceFrom,
      maxValue: productFilter.priceTo,
      setPriceFromAndTo: this.props.setPriceFromAndTo,
      settings: settings
    }), /*#__PURE__*/React.createElement("button", {
      className: "button is-fullwidth is-dark is-hidden-tablet",
      onClick: this.sidebarClose
    }, text.close)))));
  }

}

export default ProductFilter;