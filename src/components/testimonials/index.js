import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'

import ReactHtmlParser from 'react-html-parser'

const Testimonials = () => {
  const { wpgraphql } = useStaticQuery(graphql`
    query TestimonialQuery {
      wpgraphql {
        themeOptions {
          acfTestimonials {
            testimonials {
              clientDescription
              clientName
              clientImage {
                altText
                sourceUrl(size: LARGE)
              }
            }
          }
        }
      }
    }
  `)
  return (
    <section className={`testimonials`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div className={`entry-header`}>
              <h2 className={`h2-text`}>Testimonials</h2>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-12`}>
            <div className={`testimonial-slider`}>
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                pagination={true}
                modules={[Pagination, Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                {wpgraphql.themeOptions.acfTestimonials.testimonials &&
                  wpgraphql.themeOptions.acfTestimonials.testimonials.map(
                    ({ clientName, clientDescription, clientImage }, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className={`client-profile-pic`}>
                            <img
                              loading="lazy"
                              src={clientImage.sourceUrl}
                              alt={clientImage.altText}
                            />
                          </div>
                          <div className={`client-desc`}>
                            {ReactHtmlParser(clientDescription)}
                          </div>
                          <div className={`client-name`}>{clientName}</div>
                        </SwiperSlide>
                      )
                    }
                  )}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
