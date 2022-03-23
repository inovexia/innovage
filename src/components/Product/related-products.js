import React, { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import RelatedProductBox from './related-product-box'
import PrevArrow from '~/components/icons/prev-arrow'
import NextArrow from '~/components/icons/next-arrow'

const GET_RELATED_PRODUCTS = gql`
  query GET_RELATED_PRODUCTS(
    $query: String
    $first: Int
    $sortKey: ProductSortKeys
    $reverse: Boolean
  ) {
    relatedProducts: products(
      query: $query
      first: $first
      sortKey: $sortKey
      reverse: $reverse
    ) {
      products: edges {
        product: node {
          id
          availableForSale
          handle
          title
          tags
          createdAt
          publishedAt
          productType
          vendor
          variants(first: 1) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                }
                compareAtPriceV2 {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                altText
                url
              }
            }
          }
        }
      }
    }
  }
`

SwiperCore.use([Navigation])

const RelatedProducts = ({ title, ignoreProduct, tags, sortKey, reverse }) => {
  const [products, updateProducts] = useState([]),
    [loadRelatedProducts] = useLazyQuery(GET_RELATED_PRODUCTS, {
      variables: {
        query: `-title:'${ignoreProduct}' AND (${
          tags.length
            ? `${tags
                .map(tag => ` tag:'${decodeURIComponent(tag)}' `)
                .join('OR')}`
            : ''
        })`,
        first: 6,
        sortKey: sortKey,
        reverse: reverse,
      },
      onCompleted: data => {
        if (data) {
          if (data.relatedProducts) {
            data.relatedProducts.products &&
              updateProducts(data.relatedProducts.products)
          }
        }
      },
    })

  useEffect(() => {
    loadRelatedProducts()
  }, [loadRelatedProducts])

  return (
    <div className={'related-products'}>
      <div className={'title-area'}>
        <h4>{title}</h4>
      </div>
      {products && (
        <div className={'products'}>
          <Swiper
            spaceBetween={0}
            slidesPerView={2.2}
            navigation={{
              nextEl: '.related-products .btn-swiper.next-icon',
              prevEl: '.related-products .btn-swiper.prev-icon',
            }}
            breakpoints={{
              768: { spaceBetween: 0, slidesPerView: 2.5 },
              992: { spaceBetween: 20, slidesPerView: 3 },
            }}
          >
            {products.length > 0 &&
              products.map(({ product }, i) => {
                return (
                  <SwiperSlide key={i}>
                    <RelatedProductBox product={product} />
                  </SwiperSlide>
                )
              })}
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

export default RelatedProducts
