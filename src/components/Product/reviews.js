import React, { useCallback, useEffect, useState } from 'react'
import atob from 'atob'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { Toast } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import PrevArrow from '~/components/icons/prev-arrow'
import NextArrow from '~/components/icons/next-arrow'
import AddReview from './add-review'

SwiperCore.use([Navigation])

const Reviews = ({
  product,
  setProductRating,
  product: {
    images: {
      edges: [firstImage],
    },
  },
}) => {
  const shopName = `${process.env.SHOP_NAME}.myshopify.com`,
    productID = parseInt(atob(product.id).split('/').pop()),
    [shopID, setShopID] = useState(null),
    [avgRating, setAvgRating] = useState(0),
    [ratingData, setRatingData] = useState([]),
    [totalRating, setTotalRating] = useState(0),
    [response, setResponse] = useState(false),
    [responseColor, setResColor] = useState(''),
    [responseMessage, setResponseMessage] = useState(null),
    getDate = date => {
      const msec = Date.parse(date),
        d = new Date(msec),
        month = String(d.getMonth() + 1).padStart(2, '0'),
        day = String(d.getDate()).padStart(2, '0'),
        year = d.getYear() - 100
      return `${month}/${day}/${year}`
    },
    fetchAllRating = useCallback(
      async URL => {
        const res = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        res
          .json()
          .then(responseJson => {
            const allRating = responseJson.data
            let sum = 0
            allRating.forEach(v => {
              sum += v.rating
            })
            setTotalRating(allRating.length)
            setAvgRating(sum / allRating.length)
            setRatingData(allRating)
            setProductRating(sum / allRating.length)
          })
          .catch(error => {
            console.error(error)
          })
      },
      [setProductRating]
    ),
    fetchShopID = useCallback(
      async URL => {
        try {
          const res = await fetch(URL)
          res
            .json()
            .then(responseJson => {
              setShopID(responseJson.data.shopify_id)
              fetchAllRating(
                `//reviews.hulkapps.com/api/shop/${responseJson.data.shopify_id}/reviews/all?product_id=${productID}`
              )
            })
            .catch(error => {
              console.error(error)
            })
        } catch (error) {
          console.error(error.message)
        }
      },
      [productID, fetchAllRating]
    )

  useEffect(() => {
    fetchShopID(`//reviews.hulkapps.com/api/shop?shopify_domain=${shopName}`)
  }, [fetchShopID, shopName])

  false && console.log(avgRating, totalRating)

  return (
    <div className={'product-reviews'}>
      <div className={'header'}>
        <h4 className={'title'}>Reviews</h4>
        <AddReview
          shopID={shopID}
          productID={productID}
          productHandle={product.handle}
          productTitle={product.title}
          productImg={firstImage ? firstImage.node.url : ``}
          setResColor={setResColor}
          setRes={setResponse}
          updateResMsg={setResponseMessage}
        />
      </div>
      {ratingData.length > 0 && (
        <div className={'slider'}>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.product-reviews .btn-swiper.next-icon',
              prevEl: '.product-reviews .btn-swiper.prev-icon',
            }}
          >
            {ratingData.map(
              ({ author, body, created_at, rating, title }, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div className={'review'} data-rating={rating}>
                      <div className={'body'} title={title}>
                        {body}
                      </div>
                      <div className={'info'}>
                        <h5 className={'author'}>{author}</h5>
                        <h5 className={'date'}>{getDate(created_at)}</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              }
            )}
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
      {ratingData.length === 0 && (
        <Toast bg={'demo-primary'} className={'w-100'}>
          <div className={'d-flex'}>
            <Toast.Body>{'No Reviews Yet...'}</Toast.Body>
          </div>
        </Toast>
      )}
      {response && (
        <ToastContainer
          className={'px-3 p-lg-3 position-fixed'}
          position={'bottom-center'}
          style={{ zIndex: 9999 }}
        >
          <Toast
            bg={responseColor}
            onClose={() => setResponse(false)}
            show={response}
            delay={5000}
            autohide={true}
          >
            <div className={'d-flex'}>
              <Toast.Body>{responseMessage}</Toast.Body>
              <button
                type={'button'}
                className={'btn-close me-2 m-auto'}
                aria-label={'Close'}
                onClick={() => {
                  setResponse(false)
                  setResponseMessage(null)
                }}
              />
            </div>
          </Toast>
        </ToastContainer>
      )}
    </div>
  )
}

export default Reviews
