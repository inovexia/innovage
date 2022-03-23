import React from 'react'

import Seo from '~/components/seo'
import BlogPageData from '~/components/constants/pages/blog-page-data'
import Blog from '~/components/Blog'

const BlogPage = () => {
  const { seoData } = BlogPageData(),
    { title, description } = seoData

  return (
    <>
      <Seo title={title} description={description} />
      <Blog />
    </>
  )
}

export default BlogPage
