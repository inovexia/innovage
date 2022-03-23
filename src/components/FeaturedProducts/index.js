import React, { useEffect, useState } from 'react'
import { useIsMounted } from 'react-tidy'
import { Link } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactHtmlParser from 'html-react-parser'

import AddToBag from '~/components/AddToBag'
import PrevArrow from '~/components/icons/prev-arrow'
import NextArrow from '~/components/icons/next-arrow'
import Offer from '~/components/icons/offer'
import getShortTitle from '~/components/functions/get-short-title'

SwiperCore.use([EffectCoverflow, Pagination, Navigation])
const FeaturedProducts = ({
  data: {
    sectionTitle,
    productsData: { products },
  },
}) => {
  const isMounted = useIsMounted(),
    [isTablet, setTablet] = useState(false),
    [slides, upDateSlides] = useState([])

  useEffect(() => {
    if (isMounted() && typeof window !== 'undefined') {
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })

      products &&
        upDateSlides(
          products.map(
            (
              {
                product: {
                  title,
                  handle,
                  description,
                  images: {
                    edges: [firstImage],
                  },
                  variants: {
                    edges: [initialVariant],
                  },
                },
              },
              index
            ) => (
              <SwiperSlide key={index}>
                <div className={'product-slide'}>
                  <div className={'slider-content text-center'}>
                    <div className={'product-image'}>
                      <div className={'learn-more'}>
                        <Link
                          to={`/product/${handle}/`}
                          className={'btn btn-demo-primary'}
                        >
                          {`See ${getShortTitle(title)}`}
                        </Link>
                      </div>
                      <GatsbyImage
                        image={
                          firstImage.node.localImage.childImageSharp
                            .gatsbyImageData
                        }
                        alt={firstImage.node.altText || `Slide-${index + 1}`}
                      />
                      <AddToBag variant={initialVariant.node} />
                    </div>
                    <div className={'product-title'}>
                      <h3>
                        <Link to={`/product/${handle}/`}>
                          {ReactHtmlParser(title)}
                        </Link>
                      </h3>
                      <p>{ReactHtmlParser(description)}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          )
        )
    }
  }, [isMounted, setTablet, products])

  return (
    <section className={'featured-products'}>
      <div className={'featured-wrapper'}>
        {!isTablet && slides.length > 0 && (
          <div className={'offer-wrap'}>
            <div className={'offer'}>
              <Offer with={250} height={252} />
              <div className={'offer-text'}>
                FREE DELIVERY IN ORDERS OVER $45*
              </div>
            </div>
          </div>
        )}
        <h2 className={'entry-title'}>{sectionTitle}</h2>
        <div className={'slider'}>
          {slides.length > 0 && (
            <Swiper
              spaceBetween={30}
              slidesPerView={2}
              navigation={{
                nextEl: '.featured-products .btn-swiper.next-icon',
                prevEl: '.featured-products .btn-swiper.prev-icon',
              }}
              breakpoints={{
                375: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1200: {
                  spaceBetween: 20,
                  slidesPerView: 3,
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
      </div>
    </section>
  )
}

export default FeaturedProducts
