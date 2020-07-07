import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { themeSettings } from "../lib/settings";

const renderItem = item => /*#__PURE__*/React.createElement("div", {
  className: "image-gallery-image"
}, /*#__PURE__*/React.createElement(NavLink, {
  to: item.path || ""
}, /*#__PURE__*/React.createElement("img", {
  src: item.original,
  alt: item.title
}), /*#__PURE__*/React.createElement("div", {
  className: "caption",
  style: {
    color: themeSettings.home_slider_color || "#fff"
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "caption-title"
}, item.title), /*#__PURE__*/React.createElement("div", {
  className: "caption-description"
}, item.description))));

const HomeSlider = ({
  images
}) => {
  if (images && images.length > 0) {
    const items = images.map(item => ({
      original: item.image,
      title: item.title,
      description: item.description,
      path: item.path || "",
      button: item.button
    }));
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "home-slider"
    }, /*#__PURE__*/React.createElement(ImageGallery, {
      items: items,
      lazyLoad: true,
      showThumbnails: false,
      slideInterval: 2000,
      showNav: themeSettings.home_gallery_shownav === true,
      showBullets: images.length > 1,
      showPlayButton: false,
      showFullscreenButton: false,
      slideOnThumbnailHover: false,
      renderItem: renderItem
    }))));
  }

  return null;
};

HomeSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({}))
};
HomeSlider.defaultProps = {
  images: null
};
export default HomeSlider;