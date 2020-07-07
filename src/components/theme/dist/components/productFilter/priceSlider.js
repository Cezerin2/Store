import React from "react";
import { NavLink } from "react-router-dom";
import { Range } from "rc-slider";
import { themeSettings, text } from "../../lib/settings";
import * as helper from "../../lib/helper";

class PriceSlider extends React.Component {
  constructor(props) {
    super(props);

    this.setValues = values => {
      if (Array.isArray(values) && values.length === 2) {
        this.setState({
          minValue: values[0],
          maxValue: values[1]
        });
      }
    };

    this.state = {
      minValue: props.minValue > 0 ? props.minValue : props.minPrice,
      maxValue: props.maxValue > 0 ? props.maxValue : props.maxPrice
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.minPrice !== this.props.minPrice || nextProps.maxPrice !== this.props.maxPrice) {
      this.setState({
        minValue: nextProps.minPrice,
        maxValue: nextProps.maxPrice
      });
    }
  }

  render() {
    const {
      minPrice,
      maxPrice,
      setPriceFromAndTo,
      settings
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "price-filter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "attribute-title"
    }, text.price), /*#__PURE__*/React.createElement(Range, {
      min: minPrice,
      max: maxPrice,
      value: [this.state.minValue, this.state.maxValue],
      disabled: maxPrice === 0,
      className: "price-filter-range",
      onAfterChange: values => {
        setPriceFromAndTo(...values);
      },
      onChange: this.setValues
    }), /*#__PURE__*/React.createElement("div", {
      className: "columns is-mobile is-gapless price-filter-values"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column has-text-left"
    }, helper.formatCurrency(this.state.minValue, settings)), /*#__PURE__*/React.createElement("div", {
      className: "column has-text-right"
    }, helper.formatCurrency(this.state.maxValue, settings))));
  }

}

export default PriceSlider;