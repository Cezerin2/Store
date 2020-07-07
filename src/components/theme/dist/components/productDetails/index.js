import React from "react";
import { NavLink } from "react-router-dom";
import * as helper from "../../lib/helper";
import { themeSettings, text } from "../../lib/settings";
import Disqus from "../comments/disqus";
import ViewedProducts from "../products/viewed";
import Breadcrumbs from "./breadcrumbs";
import DiscountCountdown from "./discountCountdown";
import AddToCartButton from "./addToCartButton";
import Attributes from "./attributes";
import Gallery from "./gallery";
import Options from "./options";
import Price from "./price";
import Quantity from "./quantity";
import RelatedProducts from "./relatedProducts";
import Tags from "./tags";

const Description = ({
  description
}) => /*#__PURE__*/React.createElement("div", {
  className: "product-content",
  dangerouslySetInnerHTML: {
    __html: description
  }
});

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.setQuantity = quantity => {
      this.setState({
        quantity
      });
    };

    this.state = {
      selectedOptions: {},
      selectedVariant: null,
      isAllOptionsSelected: false,
      quantity: 1
    };
    this.onOptionChange = this.onOptionChange.bind(this);
    this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
  }

  onOptionChange(optionId, valueId) {
    const {
      selectedOptions
    } = this.state;

    if (valueId === "") {
      delete selectedOptions[optionId];
    } else {
      selectedOptions[optionId] = valueId;
    }

    this.setState({
      selectedOptions
    });
    this.findVariantBySelectedOptions();
    this.checkSelectedOptions();
  }

  findVariantBySelectedOptions() {
    const {
      selectedOptions
    } = this.state;
    const {
      product
    } = this.props;

    for (const variant of product.variants) {
      const variantMutchSelectedOptions = variant.options.every(variantOption => selectedOptions[variantOption.option_id] === variantOption.value_id);

      if (variantMutchSelectedOptions) {
        this.setState({
          selectedVariant: variant
        });
        return;
      }
    }

    this.setState({
      selectedVariant: null
    });
  }

  addToCart() {
    const {
      product,
      addCartItem
    } = this.props;
    const {
      selectedVariant,
      quantity
    } = this.state;
    const item = {
      product_id: product.id,
      quantity
    };

    if (selectedVariant) {
      item.variant_id = selectedVariant.id;
    }

    addCartItem(item);
  }

  checkSelectedOptions() {
    const {
      selectedOptions
    } = this.state;
    const {
      product
    } = this.props;
    const allOptionsSelected = Object.keys(selectedOptions).length === product.options.length;
    this.setState({
      isAllOptionsSelected: allOptionsSelected
    });
  }

  render() {
    const {
      product,
      settings,
      categories
    } = this.props;
    const {
      selectedVariant,
      isAllOptionsSelected
    } = this.state;
    const maxQuantity = product.stock_status === "discontinued" ? 0 : product.stock_backorder ? themeSettings.maxCartItemQty : selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity;

    if (product) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
        className: "section section-product"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "columns"
      }, /*#__PURE__*/React.createElement("div", {
        className: "column is-7"
      }, themeSettings.show_product_breadcrumbs && /*#__PURE__*/React.createElement(Breadcrumbs, {
        product: product,
        categories: categories
      }), /*#__PURE__*/React.createElement(Gallery, {
        images: product.images
      })), /*#__PURE__*/React.createElement("div", {
        className: "column is-5"
      }, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement(Tags, {
        tags: product.tags
      }), /*#__PURE__*/React.createElement("h1", {
        className: "title is-4 product-name"
      }, product.name), /*#__PURE__*/React.createElement(Price, {
        product: product,
        variant: selectedVariant,
        isAllOptionsSelected: isAllOptionsSelected,
        settings: settings
      }), themeSettings.show_discount_countdown && product.on_sale === true && /*#__PURE__*/React.createElement(DiscountCountdown, {
        product: product
      }), /*#__PURE__*/React.createElement(Options, {
        options: product.options,
        onChange: this.onOptionChange
      }), /*#__PURE__*/React.createElement(Quantity, {
        maxQuantity: maxQuantity,
        onChange: this.setQuantity
      }), /*#__PURE__*/React.createElement("div", {
        className: "button-addtocart"
      }, /*#__PURE__*/React.createElement(AddToCartButton, {
        product: product,
        variant: selectedVariant,
        addCartItem: this.addToCart,
        isAllOptionsSelected: isAllOptionsSelected
      }))))))), /*#__PURE__*/React.createElement("section", {
        className: "section section-product-description"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "content"
      }, /*#__PURE__*/React.createElement("div", {
        className: "columns"
      }, /*#__PURE__*/React.createElement("div", {
        className: "column is-7"
      }, /*#__PURE__*/React.createElement(Description, {
        description: product.description
      })), /*#__PURE__*/React.createElement("div", {
        className: "column is-5"
      }, /*#__PURE__*/React.createElement(Attributes, {
        attributes: product.attributes
      })))))), /*#__PURE__*/React.createElement(RelatedProducts, {
        settings: settings,
        addCartItem: this.addToCart,
        ids: product.related_product_ids,
        limit: 10
      }), themeSettings.show_viewed_products && /*#__PURE__*/React.createElement(ViewedProducts, {
        settings: settings,
        addCartItem: this.addToCart,
        product: product,
        limit: themeSettings.limit_viewed_products || 4
      }), themeSettings.disqus_shortname && themeSettings.disqus_shortname !== "" && /*#__PURE__*/React.createElement("section", {
        className: "section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement(Disqus, {
        shortname: themeSettings.disqus_shortname,
        identifier: product.id,
        title: product.name,
        url: product.url
      }))));
    }

    return null;
  }

}

export default ProductDetails;