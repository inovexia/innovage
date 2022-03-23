import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import CategoryPageData from '~/components/constants/pages/category-page-data'
import ProductCategory from '~/components/ProductCategory'

const CollectionPage = ({
  data: {
    store: { collection },
  },
}) => {
  const { seoData } = CategoryPageData(),
    { schema } = seoData

  useEffect(() => {
    if (typeof window !== 'undefined') {
      schema.title = collection.title
      schema.url = window.location.href
    }
  }, [schema, collection])

  return (
    <>
      <Seo
        title={collection?.title !== '' ? collection?.title : seoData.title}
        description={
          collection?.description !== ''
            ? collection?.description
            : seoData.description
        }
        schemaMarkup={schema}
      />
      <ProductCategory collectionData={collection} />
    </>
  )
}

export default CollectionPage

export const query = graphql`
  query ($handle: String!) {
    store {
      collection(handle: $handle) {
        id
        title
        handle
        description(truncateAt: 320)
      }
    }
  }
`
