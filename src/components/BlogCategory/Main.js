import React, { useState } from 'react'

import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import ArrLeft from '~/components/icons/arr-left'
import ArrRight from '~/components/icons/arr-right'
import ArticletBox from './article-box'
import Loader from "~/images/loader.gif"

const GET_BLOG_ARTICLES = gql`
  query GET_BLOGS_ARTICLES(
    $handle: String!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    blog: blogByHandle(handle: $handle) {
      result: articles(
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        articles: edges {
          cursor
          article: node {
            authorV2 {
                name
              }
              handle
              title
              image {
                url
                altText
              }
              publishedAt
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

const Main = ({ blogData: { title, handle } }) => {
  const [articles, setArticles] = useState(null),
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
    { loading, fetchMore } = useQuery(GET_BLOG_ARTICLES, {
      variables: {
        handle: handle,
        first: 12,
      },
      onCompleted: data => {
        if (data && data.blog) {
          const {
            blog: {
              result: { pageInfo, articles },
            },
          } = data
          updatePageInfo(pageInfo)
          setArticles(articles)
          pageInfo.hasPreviousPage &&
          articles.length > 0 &&
            setFirstCursor(articles[0].cursor)
          pageInfo.hasNextPage &&
          articles.length > 0 &&
            setLastCursor(articles[articles.length - 1].cursor)
        }
      },
    }),
    loadPrev = async () => {
      setIsLoading(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.blog.result.pageInfo)
          setArticles(fetchMoreResult.blog.result.articles)
          fetchMoreResult.blog.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.blog.result.articles.length > 0 &&
            setFirstCursor(fetchMoreResult.blog.result.articles[0].cursor)

          fetchMoreResult.blog.result.pageInfo.hasNextPage &&
            fetchMoreResult.blog.result.articles.length > 0 &&
            setLastCursor(
              fetchMoreResult.blog.result.articles[
                fetchMoreResult.blog.result.articles.length - 1
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
          updatePageInfo(fetchMoreResult.blog.result.pageInfo)
          setArticles(fetchMoreResult.blog.result.articles)
          fetchMoreResult.collection.result.pageInfo.hasPreviousPage &&
            fetchMoreResult.blog.result.articles.length > 0 &&
            setFirstCursor(fetchMoreResult.blog.result.articles[0].cursor)

          fetchMoreResult.blog.result.pageInfo.hasNextPage &&
            fetchMoreResult.blog.result.articles.length > 0 &&
            setLastCursor(
              fetchMoreResult.blog.result.articles[
                fetchMoreResult.blog.result.articles.length - 1
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
    <div className={'blogs-main'}>
      {loading ? (
        <div className={'d-flex justify-content-center'}>
          <div
            className={'spinner-grows'}
            style={{ width: '3rem', height: '3rem' }}
            role={'status'}
          >
           
            <img src={Loader} alt="loader" />
          </div>
        </div>
      ) : (
        <div className={'card-grid row'}>
          {articles && articles.length ? (
            <React.Fragment>
              <div className={'row gx-2 gx-lg-4'}>
                {articles.map(({ article, cursor }) => {
                  return <ArticletBox key={cursor} article={article} />
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
              {'No articles found'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Main
