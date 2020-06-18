import React, { useState } from "react"
import ImageGallery from "react-image-gallery"
import Lightbox from "react-image-lightbox"
import * as helper from "../../lib/helper"
import { themeSettings } from "../../lib/settings"

const Gallery = props => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(0)

  const openLightbox = () => {
    setLightboxIsOpen(true)
  }

  const closeLightbox = () => {
    setLightboxIsOpen(false)
  }

  const setPhotoIndex = (index: number) => {
    setLightboxPhotoIndex(index)
  }

  const { images } = props

  if (images && images.length > 0) {
    const imagesArray = images.map(image => ({
      original: helper.getThumbnailUrl(
        image.url,
        themeSettings.bigThumbnailWidth
      ),
      thumbnail: helper.getThumbnailUrl(
        image.url,
        themeSettings.previewThumbnailWidth
      ),
      originalAlt: image.alt,
      thumbnailAlt: image.alt,
    }))

    const originalImages = images.map(image => image.url)
    const showThumbnails = images.length > 1

    return (
      <>
        <ImageGallery
          items={imagesArray}
          showThumbnails={showThumbnails}
          onClick={openLightbox}
          lazyLoad
          slideInterval={2000}
          showNav={themeSettings.product_gallery_shownav === true}
          showBullets={showThumbnails}
          showPlayButton={false}
          showFullscreenButton={false}
          slideOnThumbnailHover
          thumbnailPosition={themeSettings.product_thumbnail_position}
          onSlide={setPhotoIndex}
        />
        {lightboxIsOpen && (
          <Lightbox
            reactModalStyle={{ overlay: { zIndex: 1099 } }}
            mainSrc={originalImages[lightboxPhotoIndex]}
            nextSrc={
              originalImages[(lightboxPhotoIndex + 1) % originalImages.length]
            }
            prevSrc={
              originalImages[
                (lightboxPhotoIndex + originalImages.length - 1) %
                  originalImages.length
              ]
            }
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setLightboxPhotoIndex(
                (lightboxPhotoIndex + originalImages.length - 1) %
                  originalImages.length
              )
            }
            onMoveNextRequest={() =>
              setLightboxPhotoIndex(
                (lightboxPhotoIndex + 1) % originalImages.length
              )
            }
          />
        )}
      </>
    )
  }
  return <div className="large-image-placeholder" />
}

export default Gallery
