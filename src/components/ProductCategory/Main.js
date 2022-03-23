import React, { useState } from 'react'

import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import ArrLeft from '~/components/icons/arr-left'
import ArrRight from '~/components/icons/arr-right'
import ProductBox from './product-box'
import Loader from "~/images/loader.gif"

const GET_COLLECTION_PRODUCTS = gql`
  query GET_COLLECTION_PRODUCTS(
    $handle: String!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    collection: collectionByHandle(handle: $handle) {
      result: products(
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        products: edges {
          cursor
          product: node {
            availableForSale
            handle
            title
            tags
            variants(first: 1) {
              edges {
                node {
                  availableForSale
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
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  altText
                  url
                  transformedSrc(maxHeight: 170, maxWidth: 258, crop: CENTER)
                }
              }
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
      }
    }
  }
`

const Main = ({ collectionData: { title, handle } }) => {
  const [products, setProducts] = useState(null),
    [firstCursor, setFirstCursor] = useState(null),
    [lastCursor, setLastCursor] = useState(null),
    [pageInfo, updatePageInfo] = useState(null),
    [isLoading, setIsLoading] = useState(false),
    scrollTop = () => {
      document.documentElement.style.scrollBehavior = 'smooth'
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      setTimeout(() => {
        document.documentElement.removeAttribute('style')
      }, 500)
    },
    { loading, fetchMore } = useQuery(GET_COLLECTION_PRODUCTS, {
      variables: {
        handle: handle,
        first: 12,
      },
      onCompleted: data => {
        if (data && data.collection) {
          const {
            collection: {
              result: { pageInfo, products },
            },
          } = data
          updatePageInfo(pageInfo)
          setProducts(products)
          pageInfo.hasPreviousPage &&
            products.length > 0 &&
            setFirstCursor(products[0].cursor)
          pageInfo.hasNextPage &&
            products.length > 0 &&
            setLastCursor(products[products.length - 1].cursor)
        }
      },
    }),
    loadPrev = async () => {
      setIsLoading(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.collection.result.pageInfo)
          setProducts(fetchMoreResult.collection.result.products)
          fetchMoreResult.collection.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.collection.result.products.length > 0 &&
            setFirstCursor(fetchMoreResult.collection.result.products[0].cursor)

          fetchMoreResult.collection.result.pageInfo.hasNextPage &&
            fetchMoreResult.collection.result.products.length > 0 &&
            setLastCursor(
              fetchMoreResult.collection.result.products[
                fetchMoreResult.collection.result.products.length - 1
              ].cursor
            )
        },
        variables: {
          before: firstCursor,
          last: 12,
          first: undefined,
        },
      })
      setIsLoading(false)
      scrollTop()
    },
    loadNext = async () => {
      setIsLoading(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.collection.result.pageInfo)
          setProducts(fetchMoreResult.collection.result.products)
          fetchMoreResult.collection.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.collection.result.products.length > 0 &&
            setFirstCursor(fetchMoreResult.collection.result.products[0].cursor)

          fetchMoreResult.collection.result.pageInfo.hasNextPage &&
            fetchMoreResult.collection.result.products.length > 0 &&
            setLastCursor(
              fetchMoreResult.collection.result.products[
                fetchMoreResult.collection.result.products.length - 1
              ].cursor
            )
        },
        variables: {
          after: lastCursor,
          first: 12,
          last: undefined,
        },
      })
      setIsLoading(false)
      scrollTop()
    }

  return (
    <div className={'listing-main'}>
      <div className={'entry-header'}>
        <h2 className={'w-100 text-left'}>{title}</h2>
      </div>
      {loading ? (
        <div
          className={
            'd-flex flex-grow-1 align-items-center justify-content-center'
          }
        >
          <div
            className={'spinner-grows'}
            style={{ width: '3rem', height: '3rem' }}
            role={'status'}
          >
           
            <img src={Loader} alt="loader" />
          </div>
        </div>
      ) : (
        <div className={'products'}>
          {products && products.length ? (
            <React.Fragment>
              <div className={'row gx-2 gx-lg-4'}>
                {products.map(({ product, cursor }) => {
                  return <ProductBox key={cursor} product={product} />
                })}
              </div>
              <div className={'pagination'}>
                {isLoading && (
                  <div className={'spinner-grow'} role={'status'}>
                    <span className={'visually-hidden'}>{'Loading...'}</span>
                  </div>
                )}
                {!isLoading &&
                  pageInfo &&
                  (pageInfo.hasPreviousPage || pageInfo.hasNextPage) && (
                    <React.Fragment>
                      <button
                        type={'button'}
                        className={'btn btn-demo-primary me-4 prev'}
                        onClick={() => loadPrev()}
                        disabled={!pageInfo.hasPreviousPage}
                      >
                        <ArrLeft width={24} height={11} stroke={'#1e1e1e'} />
                        <span className={'label ms-2'}>PREV</span>
                      </button>
                      <button
                        type={'button'}
                        className={'btn btn-demo-primary next'}
                        onClick={() => loadNext()}
                        disabled={!pageInfo.hasNextPage}
                      >
                        <span className={'label me-2'}>NEXT</span>
                        <ArrRight width={24} height={11} stroke={'#1e1e1e'} />
                      </button>
                    </React.Fragment>
                  )}
              </div>
            </React.Fragment>
          ) : (
            <div className={'alert alert-info'} role={'alert'}>
              {'No products found'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Main
