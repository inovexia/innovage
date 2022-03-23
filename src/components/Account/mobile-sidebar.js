import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Logout from './logout'

import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper.min.css'
// import 'swiper/components/pagination/pagination.min.css'
// import SwiperCore, { Pagination } from 'swiper/core'
// SwiperCore.use([Pagination])

const MobileSideBar = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document
        .querySelectorAll('.mobile-side-bar .mobile-menu-wrapper li a')
        .forEach(element => {
          if (window.location.pathname === element.getAttribute('href'))
            element.classList.add('active')
        })
    }
  }, [])

  return (
    <div className={'mobile-side-bar'}>
      <div className={'mobile-menu-wrapper'}>
        <ul className={'mobile-menu'}>
          <Swiper
            slidesPerView={2}
            // spaceBetween={20}
            // pagination={{
            //   clickable: true,
            // }}
            // className="mySwiper"
            breakpoints={{
              375: {
                slidesPerView: 3,
              },
              576: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 5,
              },
              // 992: {
              //   spaceBetween: 20,
              // },
              // 1200: {
              //   centeredSlides: false,
              //   slidesPerView: 4,
              // },
            }}
          >
            <SwiperSlide>
              <li>
                <Link to={'/account/'}>{'My Account'}</Link>
              </li>
            </SwiperSlide>

            <SwiperSlide>
              <li>
                <Link to={'/account/orders/'}>{'My Orders'}</Link>
              </li>
            </SwiperSlide>

            <SwiperSlide>
              <li>
                <Link to={'/account/address-book/'}>{'Address Book'}</Link>
              </li>
            </SwiperSlide>

            <SwiperSlide>
              <li>
                <Link to={'/account/payment-methods/'}>
                  {'Payment Methods'}
                </Link>
              </li>
            </SwiperSlide>

            <SwiperSlide>
              <li>
                <Link to={'/account/product-reviews/'}>
                  {'Product Reviews'}
                </Link>
              </li>
            </SwiperSlide>

            <SwiperSlide>
              <li>
                <Logout />
              </li>
            </SwiperSlide>
          </Swiper>
        </ul>
      </div>
    </div>
  )
}

export default MobileSideBar
