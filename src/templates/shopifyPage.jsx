import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import ShopifyPageData from '~/components/constants/pages/shopify-page-data'
import ShopifyPageContent from '~/components/ShopifyPageContent'

const ShopifyPage = ({
  data: {
    store: { page },
  },
}) => {
  const { seoData } = ShopifyPageData(),
    { schema } = seoData

  useEffect(() => {
    if (typeof window !== 'undefined') {
      schema.title = page?.title
      schema.url = window.location.href
    }
  }, [page, schema])

  return (
    <>
      <Seo
        title={page?.title}
        description={
          page?.bodySummary !== '' ? page?.bodySummary : seoData.description
        }
        schemaMarkup={schema}
      />
      <ShopifyPageContent title={page?.title} body={page?.body} />
    </>
  )
}

export default ShopifyPage

export const query = graphql`
  query ($handle: String!) {
    store {
      page(handle: $handle) {
        body
        bodySummary
        title
      }
    }
  }
`
