import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper'
import { GatsbyImage } from 'gatsby-plugin-image'

import PrevArrow from '~/components/icons/prev-arrow'
import NextArrow from '~/components/icons/next-arrow'

SwiperCore.use([EffectCoverflow, Pagination, Navigation])
const GallerySlider = ({ data: { sectionTitle, gallerySlider } }) => {
  return (
    <section className={'gallery-slider'}>
      <div className={'container-fluid'}>
        <h2 className={'entry-title'}>{sectionTitle}</h2>
        <div className={'slider'}>
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            centeredSlides={true}
            loop={true}
            navigation={{
              nextEl: '.gallery-slider .btn-swiper.next-icon',
              prevEl: '.gallery-slider .btn-swiper.prev-icon',
            }}
            breakpoints={{
              375: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
                centeredSlides: false,
              },
              1200: {
                spaceBetween: 20,
                slidesPerView: 4,
                centeredSlides: false,
              },
            }}
          >
            {gallerySlider &&
              gallerySlider.map(({ image }, index) => (
                <SwiperSlide key={index}>
                  <div className={'gallery-slide'}>
                    <div className={'slider-content text-center'}>
                      <div className={'gallery-image'}>
                        <GatsbyImage
                          image={image.childImageSharp.gatsbyImageData}
                          alt={`Slide-${index + 1}`}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
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
      </div>
    </section>
  )
}

export default GallerySlider
