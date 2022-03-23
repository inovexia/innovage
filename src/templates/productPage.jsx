import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import Product from '~/components/Product'

const ProductPage = ({
  data: {
    imagesData,
    store: {
      product,
      product: {
        images: {
          edges: [
            {
              node: { url: ogImage },
            },
          ],
        },
      },
    },
  },
}) => {
  const [totalProductRating, setTotalProductRating] = useState(0),
    schema = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: ogImage,
      sku: product.variants?.edges[0]?.node.sku ?? '',
      brand: {
        '@type': 'Brand',
        name: product.vendor,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: totalProductRating,
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: product.priceRange.minVariantPrice.currencyCode,
        price: product.priceRange.minVariantPrice.amount,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
    }
  product.shopifyId = `Shopify__Product__${product.id}`

  return (
    <>
      <Seo
        title={product.title}
        description={product.description}
        ogImage={ogImage}
        schemaMarkup={schema}
      />
      <Product
        product={product}
        imagesData={imagesData}
        setProductRating={setTotalProductRating}
      />
    </>
  )
}

export default ProductPage
// ! id had prefixed with "Shopify__Product__"
export const query = graphql`
  query ($handle: String!) {
    imagesData: shopifyProduct(handle: { eq: $handle }) {
      images {
        altText
        gatsbyImageData(formats: AUTO)
      }
    }
    store {
      product(handle: $handle) {
        handle
        id
        tags
        title
        productType
        description(truncateAt: 320)
        descriptionHtml
        options {
          id
          name
          values
        }
        collections(first: 1) {
          edges {
            node {
              handle
              title
            }
          }
        }
        vendor
        totalInventory
        variants(first: 10) {
          edges {
            node {
              id
              priceV2 {
                amount
              }
              availableForSale
              sku
              weight
              weightUnit
              quantityAvailable
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
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 15) {
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
`
