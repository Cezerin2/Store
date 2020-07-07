import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { themeSettings, text } from "../lib/settings";

class FooterMenu extends React.Component {
  constructor(props) {
    super(props);

    this.isActiveToggle = () => {
      this.setState({
        isActive: !this.state.isActive
      });
    };

    this.state = {
      isActive: false
    };
  }

  render() {
    const {
      title,
      items
    } = this.props;
    let ulItems = null;

    if (items && items.length > 0) {
      ulItems = items.map((item, index) => /*#__PURE__*/React.createElement("li", {
        key: index
      }, /*#__PURE__*/React.createElement(NavLink, {
        to: item.url || ""
      }, item.text)));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "column is-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: `footer-title mobile-padding${this.state.isActive ? " footer-menu-open" : ""}`,
      onClick: this.isActiveToggle
    }, title, /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("ul", {
      className: "footer-menu"
    }, ulItems));
  }

}

const SocialIcons = ({
  icons
}) => {
  if (icons && icons.length > 0) {
    const items = icons.map((icon, index) => /*#__PURE__*/React.createElement("a", {
      key: index,
      href: icon.url || "",
      target: "_blank",
      rel: "noopener",
      title: icon.type,
      className: icon.type
    }));
    return /*#__PURE__*/React.createElement("p", {
      className: "social-icons"
    }, items);
  }

  return null;
};

const Contacts = ({
  contacts
}) => {
  if (contacts && contacts.length > 0) {
    const items = contacts.map((item, index) => {
      const contact = item ? item.text : null;

      if (contact && contact.indexOf("@") > 0) {
        return /*#__PURE__*/React.createElement("li", {
          key: index
        }, /*#__PURE__*/React.createElement("a", {
          href: `mailto:${contact}`
        }, contact));
      }

      return /*#__PURE__*/React.createElement("li", {
        key: index
      }, contact);
    });
    return /*#__PURE__*/React.createElement("ul", {
      className: "footer-contacts"
    }, items);
  }

  return null;
};

class Footer extends React.PureComponent {
  render() {
    const {
      settings
    } = this.props;
    const footerLogoUrl = settings.logo && settings.logo.length > 0 ? settings.logo : null;
    return /*#__PURE__*/React.createElement("section", {
      className: "section section-footer"
    }, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "columns is-gapless"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column is-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mobile-padding"
    }, /*#__PURE__*/React.createElement("div", {
      className: "footer-logo"
    }, /*#__PURE__*/React.createElement("img", {
      src: footerLogoUrl,
      alt: "logo"
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("small", null, themeSettings.footer_about)), /*#__PURE__*/React.createElement(Contacts, {
      contacts: themeSettings.footer_contacts
    }), /*#__PURE__*/React.createElement(SocialIcons, {
      icons: themeSettings.footer_social
    }))), /*#__PURE__*/React.createElement("div", {
      className: "column is-1 is-hidden-mobile"
    }), /*#__PURE__*/React.createElement(FooterMenu, {
      title: themeSettings.footer_menu_1_title,
      items: themeSettings.footer_menu_1_items
    }), /*#__PURE__*/React.createElement(FooterMenu, {
      title: themeSettings.footer_menu_2_title,
      items: themeSettings.footer_menu_2_items
    }))))));
  }

}

Footer.propTypes = {
  settings: PropTypes.shape({}).isRequired
};
export default Footer;