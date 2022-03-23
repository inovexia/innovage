import React, { useEffect, useState } from 'react'
import { useIsMounted } from 'react-tidy'
import { Link } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactHtmlParser from 'html-react-parser'

import PrevArrow from '~/components/icons/prev-arrow'
import NextArrow from '~/components/icons/next-arrow'

SwiperCore.use([EffectCoverflow, Pagination, Navigation])
const CollectionSlider = ({ data: { sectionTitle, slider } }) => {
  const isMounted = useIsMounted(),
    [slides, upDateSlides] = useState([])

  useEffect(() => {
    slider &&
      upDateSlides(
        slider.map(({ name, image, link }, index) => (
          <SwiperSlide key={index}>
            <div className={'collection-slide'}>
              <Link to={link} className={'slider-content text-center'}>
                <div className={'collection-image'}>
                  <GatsbyImage
                    image={image.childImageSharp.gatsbyImageData}
                    alt={`Slide-${index + 1}`}
                  />
                </div>
                <div className={'collection-title'}>
                  {ReactHtmlParser(name)}
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))
      )
  }, [slider])

  return (
    isMounted() && (
      <section className={'collection-slider'}>
        <div className={'header'}>
          <h2 className={'title'}>{sectionTitle}</h2>
        </div>
        <div className={'slider'}>
          {slides.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={2}
              centeredSlides={true}
              pagination={{
                type: 'fraction',
              }}
              navigation={{
                nextEl: '.collection-slider .btn-swiper.next-icon',
                prevEl: '.collection-slider .btn-swiper.prev-icon',
              }}
              loop={true}
              breakpoints={{
                375: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1200: {
                  spaceBetween: 20,
                  slidesPerView: 5,
                },
              }}
            >
              {slides}
            </Swiper>
          )}
          {slides.length > 0 && (
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
          )}
        </div>
      </section>
    )
  )
}

export default CollectionSlider
