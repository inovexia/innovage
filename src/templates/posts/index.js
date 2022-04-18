import React from 'react'
import { graphql } from 'gatsby'
import Seo from '~/components/seo'
import ReactHtmlParser from 'react-html-parser'

const Post = ({ data }) => {
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
      return `${day} ${month} ${year}`
    },
    { title, date, featuredImage, author, excerpt, content } =
      data.wpgraphql.post
  return (
    <>
      <Seo title={title} description={excerpt} />
      <section
        className={`banner d-flex justify-content-center align-items-center`}
        style={{
          backgroundImage:
            featuredImage !== null
              ? `url(${featuredImage.node.sourceUrl})`
              : `none`,
        }}
      >
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div className={`col-12`}>
              <div className={`banner-content text-center`}>
                <h1 className={`h1-text`}>{title}</h1>
                <span className="text-white-2 opacity6 alt-font no-margin-bottom text-uppercase text-small">
                  {getDate(date)}
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;by&nbsp;
                  {author.node.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`blog-content`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">{ReactHtmlParser(content)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
export const query = graphql`
  query ($postId: ID!) {
    wpgraphql {
      post(id: $postId, idType: DATABASE_ID) {
        author {
          node {
            name
          }
        }
        date
        postId
        title(format: RENDERED)
        excerpt(format: RENDERED)
        content(format: RENDERED)
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  }
`
export default Post
