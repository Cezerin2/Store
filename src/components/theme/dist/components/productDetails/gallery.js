import React from "react";
import { NavLink } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import Lightbox from "react-image-lightbox";
import * as helper from "../../lib/helper";
import { themeSettings, text } from "../../lib/settings";

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.openLightbox = () => {
      this.setState({
        lightboxIsOpen: true
      });
    };

    this.closeLightbox = () => {
      this.setState({
        lightboxIsOpen: false
      });
    };

    this.setPhotoIndex = index => {
      this.setState({
        lightboxPhotoIndex: index
      });
    };

    this.state = {
      lightboxIsOpen: false,
      lightboxPhotoIndex: 0
    };
  }

  render() {
    const {
      images
    } = this.props;
    const {
      lightboxIsOpen,
      lightboxPhotoIndex
    } = this.state;

    if (images && images.length > 0) {
      const imagesArray = images.map(image => ({
        original: helper.getThumbnailUrl(image.url, themeSettings.bigThumbnailWidth),
        thumbnail: helper.getThumbnailUrl(image.url, themeSettings.previewThumbnailWidth),
        originalAlt: image.alt,
        thumbnailAlt: image.alt
      }));
      const originalImages = images.map(image => image.url);
      const showThumbnails = images.length > 1;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ImageGallery, {
        items: imagesArray,
        showThumbnails: showThumbnails,
        onClick: this.openLightbox,
        lazyLoad: true,
        slideInterval: 2000,
        showNav: themeSettings.product_gallery_shownav === true,
        showBullets: showThumbnails,
        showPlayButton: false,
        showFullscreenButton: false,
        slideOnThumbnailHover: true,
        thumbnailPosition: themeSettings.product_thumbnail_position,
        onSlide: this.setPhotoIndex
      }), lightboxIsOpen && /*#__PURE__*/React.createElement(Lightbox, {
        reactModalStyle: {
          overlay: {
            zIndex: 1099
          }
        },
        mainSrc: originalImages[lightboxPhotoIndex],
        nextSrc: originalImages[(lightboxPhotoIndex + 1) % originalImages.length],
        prevSrc: originalImages[(lightboxPhotoIndex + originalImages.length - 1) % originalImages.length],
        onCloseRequest: this.closeLightbox,
        onMovePrevRequest: () => this.setState({
          lightboxPhotoIndex: (lightboxPhotoIndex + originalImages.length - 1) % originalImages.length
        }),
        onMoveNextRequest: () => this.setState({
          lightboxPhotoIndex: (lightboxPhotoIndex + 1) % originalImages.length
        })
      }));
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "large-image-placeholder"
    });
  }

}

export default Gallery;