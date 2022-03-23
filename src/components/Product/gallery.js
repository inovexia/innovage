import React, { useEffect, useState } from 'react'
import { useIsMounted } from 'react-tidy'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs } from 'swiper/core'

import isTablet from '~/components/functions/is-tablet'
import Offer from '~/components/icons/offer'
import isBrowser from '~/components/functions/is-browser'

SwiperCore.use([Thumbs])

const Gallery = ({ images, onSale }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null),
    [GallerySlides, upDateGallerySlides] = useState([]),
    [ThumbSlides, upDateThumbSlides] = useState([]),
    isMounted = useIsMounted()

  useEffect(() => {
    if (isBrowser) {
      window.addEventListener('scroll', e => {
        if (isMounted() && isTablet) {
          const header = document.querySelector('header'),
            galleryContainer = document.querySelector(
              '.product-content .gallery'
            ),
            galleryWrapper = document.querySelector(
              '.product-content .gallery .wrap'
            ),
            winPosY = window.scrollY,
            headerSpace = 20,
            condition = [
              winPosY <=
                galleryWrapper.offsetTop - header.offsetHeight - headerSpace,
              winPosY >=
                galleryWrapper.offsetTop - header.offsetHeight - headerSpace,
              winPosY <=
                galleryWrapper.offsetTop -
                  header.offsetHeight -
                  headerSpace +
                  (galleryContainer.offsetHeight - galleryWrapper.offsetHeight),
            ]
          if (condition[0]) {
            galleryWrapper.style.transform = `translateY(0)`
          } else if (condition[1] && condition[2]) {
            galleryWrapper.style.transform = `translateY(${
              winPosY -
              galleryWrapper.offsetTop +
              header.offsetHeight +
              headerSpace
            }px)`
          }
        }
      })

      images &&
        upDateGallerySlides(
          images.map(({ altText, gatsbyImageData }, index) => (
            <SwiperSlide key={index}>
              <GatsbyImage
                image={gatsbyImageData}
                alt={altText ? altText : `img-${index + 1}`}
                className={'image'}
              />
            </SwiperSlide>
          ))
        )

      images &&
        upDateThumbSlides(
          images.map(({ altText, gatsbyImageData }, index) => (
            <SwiperSlide key={index}>
              <GatsbyImage
                image={gatsbyImageData}
                alt={altText ? altText : `thumb-img-${index + 1}`}
                className={'image-thumb'}
              />
            </SwiperSlide>
          ))
        )
    }
  }, [isMounted, images])

  return GallerySlides.length ? (
    <div className={'wrap'}>
      {onSale && (
        <div className={'offer-wrap'}>
          <div className={'offer'}>
            <Offer with={isTablet ? 112 : 156} height={isTablet ? 112 : 157} />
            <div className={'offer-text'}>Sale</div>
          </div>
        </div>
      )}
      <div className={'sliders'}>
        <div className={'mainSwiper'}>
          {GallerySlides.length > 0 && (
            <Swiper
              loop={images.length > 1}
              spaceBetween={20}
              thumbs={{ swiper: thumbsSwiper }}
            >
              {GallerySlides}
            </Swiper>
          )}
        </div>
        <div className={'thumbSwiper'}>
          {ThumbSlides.length > 0 && (
            <Swiper
              loop={images.length > 3}
              onSwiper={setThumbsSwiper}
              spaceBetween={7}
              slidesPerView={3}
              freeMode={true}
              watchOverflow={true}
              watchSlidesProgress={true}
            >
              {ThumbSlides}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default Gallery
