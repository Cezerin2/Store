import React from "react";
import { NavLink } from "react-router-dom";
import { themeSettings, text } from "../../lib/settings";

class DiscountCountdown extends React.Component {
  constructor(props) {
    super(props);

    this.tick = () => {
      const dateNow = new Date();
      const dateTo = new Date(this.props.product.date_sale_to);
      const diff = Math.abs(Math.floor((dateTo.getTime() - dateNow.getTime()) / 1000));
      this.setState({
        diff
      });
    };

    this.pad = num => num < 10 ? `0${num}` : num;

    this.state = {
      timer: null,
      diff: null
    };
  }

  componentDidMount() {
    const timer = setInterval(this.tick, 1000);
    this.setState({
      timer
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    const {
      product
    } = this.props;
    const {
      diff
    } = this.state;

    if (product) {
      const days = Math.floor(diff / (24 * 60 * 60));
      let leftSec = diff - days * 24 * 60 * 60;
      const hrs = Math.floor(leftSec / (60 * 60));
      leftSec -= hrs * 60 * 60;
      const min = Math.floor(leftSec / 60);
      leftSec -= min * 60;
      return /*#__PURE__*/React.createElement("div", {
        className: "discount-countdown"
      }, /*#__PURE__*/React.createElement("div", {
        className: "discount-title"
      }, text.saleEnds, ":"), /*#__PURE__*/React.createElement("div", {
        className: "columns is-mobile has-text-centered discount-numbers is-gapless",
        style: {
          margin: "8px 0"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, this.pad(days)), /*#__PURE__*/React.createElement("div", {
        className: "column is-1"
      }, ":"), /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, this.pad(hrs)), /*#__PURE__*/React.createElement("div", {
        className: "column is-1"
      }, ":"), /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, this.pad(min)), /*#__PURE__*/React.createElement("div", {
        className: "column is-1"
      }, ":"), /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, this.pad(leftSec))), /*#__PURE__*/React.createElement("div", {
        className: "columns is-mobile has-text-centered discount-labels is-gapless"
      }, /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, text.days), /*#__PURE__*/React.createElement("div", {
        className: "column is-1"
      }), /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, text.hours), /*#__PURE__*/React.createElement("div", {
        className: "column is-1"
      }), /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, text.minutes), /*#__PURE__*/React.createElement("div", {
        className: "column is-1"
      }), /*#__PURE__*/React.createElement("div", {
        className: "column is-2"
      }, text.seconds)));
    }

    return null;
  }

}

export default DiscountCountdown;