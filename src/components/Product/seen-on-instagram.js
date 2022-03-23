import React, { useEffect, useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import ProductPageData from '../constants/pages/product-page-data'
import isBrowser from '~/components/functions/is-browser'
import PrevArrow from '~/components/icons/prev-arrow'
import NextArrow from '~/components/icons/next-arrow'

SwiperCore.use([Navigation])

const SeenOnInstagram = ({ title = `Seen On Instagram` }) => {
  //
  const {
      seenOnInstagram: { images: instagramImages },
    } = ProductPageData(),
    [instagramSlides, updateInstagramSlides] = useState([])

  useEffect(() => {
    if (isBrowser) {
      instagramImages &&
        updateInstagramSlides(
          instagramImages.map(({ caption, id, image }) => {
            return (
              <SwiperSlide key={id}>
                <a
                  href={`https://www.instagram.com/p/${id}/`}
                  className={'link-to-instagram'}
                  title={caption.replace(new RegExp('#([^\\s]*)', 'g'), '')}
                  target={'_blank'}
                  rel={'nofollow noreferrer'}
                >
                  <GatsbyImage
                    image={image.childImageSharp.gatsbyImageData}
                    alt={'instagram-image'}
                    className={'image'}
                  />
                </a>
              </SwiperSlide>
            )
          })
        )
    }
  }, [instagramImages, updateInstagramSlides])

  return (
    <div className={'seen-on-instagram'}>
      <div className={'header'}>
        <h5 className={'title'}>{title}</h5>
      </div>
      {instagramSlides.length > 0 && (
        <div className={'slider'}>
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            navigation={{
              prevEl: '.seen-on-instagram .slider-nav .prev-icon',
              nextEl: '.seen-on-instagram .slider-nav .next-icon',
            }}
            breakpoints={{
              992: {
                spaceBetween: 11,
              },
            }}
          >
            {instagramSlides}
          </Swiper>
          <div className={'slider-nav'}>
            <button
              className={'btn-swiper prev-icon'}
              aria-label={'Slide Left'}
            >
              <PrevArrow width={70} height={21} />
            </button>
            <button
              className={'btn-swiper next-icon'}
              aria-label={'Slide Right'}
            >
              <NextArrow width={70} height={21} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default SeenOnInstagram
