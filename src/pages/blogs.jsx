import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import Seo from '../components/seo'
import BlogData from '../components/Blogs/blog-banner'
const BlogsPage = () => {
  const getDate = date => {
    const Months =
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      )
    const msec = Date.parse(date)
    const d = new Date(msec)
    const month = Months[d.getMonth()]
    const day = d.getDate()
    const year = d.getFullYear()
    return `${day}-${month}-${year}`
  }
  const { wpgraphql } = useStaticQuery(
    graphql`
      {
        wpgraphql {
          posts {
            nodes {
              author {
                node {
                  name
                }
              }
              date
              title(format: RENDERED)
              uri
              slug
              excerpt(format: RENDERED)
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
            }
          }
        }
      }
    `
  )
  return (
    <>
      <Seo
        title={`Blogs`}
        description={`We develop fast headless websites and Apps`}
      />
      <BlogData />
      <span>{wpgraphql.posts.nodes.title}</span>
      <section className={`blog-listing`}>
        <div className="container-fluid">
          <div className={`row entry-title`}>
            <div className={`col-12`}>
              <h3 className={`h3-text text-uppercase`}>Blogs</h3>
            </div>
          </div>
          <div className="row">
            {wpgraphql.posts.nodes ? (
              wpgraphql.posts.nodes.map(
                (
                  { author, date, excerpt, featuredImage, title, slug },
                  index
                ) => {
                  console.log(featuredImage)
                  return (
                    <div key={index} className="col-12 col-md-4 col-lg-3 mb-4">
                      <div className="blog-post blog-post-style1 text-center text-md-left h-100">
                        {featuredImage !== null && (
                          <div className="blog-post-images">
                            <Link to={`/blogs/${slug}/`}>
                              <LazyLoadImage
                                src={featuredImage.node.sourceUrl}
                                alt={featuredImage.node.altText}
                                className="mb-0 w-100"
                              />
                            </Link>
                          </div>
                        )}
                        <div className="post-details">
                          <Link
                            to={`/blogs/${slug}/`}
                            className="post-title d-block w-100"
                          >
                            {title}
                          </Link>
                          <div className="post-author">
                            <span>Post Date: {getDate(date)}</span>
                            <span>by: {author.node.name}</span>
                          </div>
                          <div className="separator"></div>
                          <div className="w-100 excerpt-text">
                            {ReactHtmlParser(excerpt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              )
            ) : (
              <p>No Products found!</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
export default BlogsPage
