import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactHtmlParser from 'html-react-parser'

import FormatDate from '~/components/functions/format-date'
import isBrowser from '~/components/functions/is-browser'
import PrevArrow from '~/components/icons/prev-arrow'
import NextArrow from '~/components/icons/next-arrow'

SwiperCore.use([EffectCoverflow, Pagination, Navigation])
const HomeBlogsSlider = ({ data: { sectionTitle, articles } }) => {
  const [blogSlides, setBlogSlides] = useState([])
  useEffect(() => {
    if (isBrowser) {
      articles &&
        setBlogSlides(
          articles.map(
            (
              {
                article: {
                  authorV2: { name: authorName },
                  title,
                  slug,
                  publishedAt,
                  image,
                },
              },
              index
            ) => (
              <SwiperSlide key={index}>
                <div className={'product-slide'}>
                  <div className={'slider-content text-center'}>
                    <div className={'product-image'}>
                      <Link
                        to={`/blog/${slug}/`}
                        title={image.altText || `Slide-${index + 1}`}
                      >
                        <GatsbyImage
                          image={
                            image.localImage.childImageSharp.gatsbyImageData
                          }
                          alt={image.altText || `Slide-${index + 1}`}
                        />
                      </Link>
                    </div>
                    <div className={'product-title'}>
                      <div className={'meta-data'}>
                        By <strong>{authorName}</strong> on
                        <span>
                          {FormatDate(new Date(publishedAt), ' MMM dd, yyyy')}
                        </span>
                      </div>
                      <p>
                        <Link to={`/blog/${slug}/`}>
                          {ReactHtmlParser(title)}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          )
        )
    }
  }, [articles])
  return (
    <section className={'blogs-slider'}>
      <div className={'wrapper'}>
        <h2 className={'entry-title'}>{sectionTitle}</h2>
        <div className={'slider'}>
          {blogSlides.length > 0 && (
            <Swiper
              spaceBetween={10}
              slidesPerView={2}
              centeredSlides={true}
              loop={articles.length > 4}
              navigation={{
                nextEl: '.blogs-slider .btn-swiper.next-icon',
                prevEl: '.blogs-slider .btn-swiper.prev-icon',
              }}
              breakpoints={{
                375: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                  centeredSlides: false,
                },
                992: {
                  spaceBetween: 20,
                },
                1200: {
                  centeredSlides: false,
                  slidesPerView: 4,
                },
              }}
            >
              {blogSlides}
            </Swiper>
          )}
          {blogSlides.length > 0 && (
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
      </div>
    </section>
  )
}

export default HomeBlogsSlider
