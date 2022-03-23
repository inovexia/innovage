import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import CategoryPageData from '~/components/constants/pages/category-page-data'
import BlogCategory from '~/components/BlogCategory'

const BlogPage = ({
  data: {
    store: { blog },
  },
}) => {
  const { seoData } = CategoryPageData(),
    { schema } = seoData

  useEffect(() => {
    if (typeof window !== 'undefined') {
      schema.title = blog.title
      schema.url = window.location.href
    }
  }, [schema, blog])

  return (
    <>
      <Seo
        title={blog?.title !== '' ? blog?.title : seoData.title}
        description={
          blog?.description !== ''
            ? blog?.description
            : seoData.description
        }
        schemaMarkup={schema}
      />
      <BlogCategory blogData={blog} />
    </>
  )
}

export default BlogPage

export const query = graphql`
  query ($handle: String!) {
    store {
        blog(handle: $handle) {
            handle
            title
        }
      }
  }
`
