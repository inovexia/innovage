import React from 'react'
import { graphql } from 'gatsby'
import Seo from '~/components/seo'
import ShopifyArticleContent from '~/components/ShopifyArticleContent'

const ArticlePage = ({
  data: {
    store: {
      blogData: {
        title: blogTitle,
        articleData: {
          authorV2: { name: authorName },
          title,
          contentHtml,
          content,
          image,
          image: { url: ogImage },
          publishedAt,
        },
      },
    },
  },
}) => {
  return (
    <>
      <Seo title={title} description={content} ogImage={ogImage} />
      <ShopifyArticleContent
        blogTitle={blogTitle}
        title={title}
        contentHtml={contentHtml}
        content={content}
        image={image}
        authorName={authorName}
        articleDate={new Date(publishedAt)}
      />
    </>
  )
}

export default ArticlePage

export const query = graphql`
  query ($blogHandle: String!, $articleHandle: String!) {
    store {
      blogData: blog(handle: $blogHandle) {
        title
        articleData: articleByHandle(handle: $articleHandle) {
          authorV2 {
            name
          }
          publishedAt
          title
          contentHtml
          content(truncateAt: 320)
          image {
            altText
            url
          }
        }
      }
    }
  }
`
