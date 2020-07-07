import React from "react";
import { themeSettings, text } from "../../lib/settings";

class Quantity extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      this.setQuantity(event.target.value);
    };

    this.setQuantity = quantity => {
      const intQuantity = parseInt(quantity);

      if (intQuantity > 0 && intQuantity <= this.props.maxQuantity) {
        this.setState({
          quantity: intQuantity
        });
        this.props.onChange(intQuantity);
      }
    };

    this.increment = () => {
      const newQuantity = this.state.quantity + 1;
      this.setQuantity(newQuantity);
    };

    this.decrement = () => {
      const newQuantity = this.state.quantity - 1;
      this.setQuantity(newQuantity);
    };

    this.state = {
      quantity: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.quantity > nextProps.maxQuantity) {
      this.setQuantity(nextProps.maxQuantity);
    }
  }

  render() {
    const {
      maxQuantity
    } = this.props;
    const {
      quantity
    } = this.state;
    const disabled = maxQuantity === 0;
    const value = disabled ? 0 : quantity;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, text.qty), /*#__PURE__*/React.createElement("div", {
      className: "product-quantity"
    }, /*#__PURE__*/React.createElement("a", {
      className: "decrement",
      onClick: this.decrement
    }), /*#__PURE__*/React.createElement("input", {
      value: value,
      onChange: this.handleChange,
      maxLength: "3",
      type: "number",
      pattern: "\\d*",
      disabled: disabled
    }), /*#__PURE__*/React.createElement("a", {
      className: "increment",
      onClick: this.increment
    })));
  }

}

export default Quantity;