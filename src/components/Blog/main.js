import React, { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from "~/images/loader.gif"
//import { Link } from 'gatsby'

import Card from './card'
//import BlogHeader from '~/components/icons/blog-header'

const GET_ARTICLES = gql`
  query GET_ARTICLES(
    $perPage: Int
    $sortKey: ArticleSortKeys
    $reverse: Boolean
    $after: String
  ) {
    result: articles(
      first: $perPage
      sortKey: $sortKey
      reverse: $reverse
      after: $after
    ) {
      articles: edges {
        cursor
        article: node {
          authorV2 {
            firstName
            lastName
            name
          }
          blog {
            handle
          }
          publishedAt
          handle
          title
          content(truncateAt: 320)
          image {
            altText
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

const Main = () => {
  const [articles, setArticles] = useState(null),
    [lastCursor, setLastCursor] = useState(null),
    [pageInfo, updatePageInfo] = useState(null),
    [isLoadingMore, setIsLoadingMore] = useState(false),
    { loading, error, fetchMore } = useQuery(GET_ARTICLES, {
      variables: {
        perPage: 6,
        sortKey: 'PUBLISHED_AT',
        reverse: false,
      },
      onCompleted: data => {
        if (data) {
          const {
            result: { pageInfo, articles },
          } = data
          updatePageInfo(pageInfo)
          setArticles(articles)
          setLastCursor(articles[articles.length - 1].cursor)
        }
      },
    }),
    loadMore = async () => {
      setIsLoadingMore(true)
      await fetchMore({
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          updatePageInfo(fetchMoreResult.result.pageInfo)
          setArticles(prevArticles =>
            prevArticles.concat(fetchMoreResult.result.articles)
          )
          setLastCursor(
            fetchMoreResult.result.articles[
              fetchMoreResult.result.articles.length - 1
            ].cursor
          )
        },
        variables: {
          after: lastCursor,
        },
      })
      setIsLoadingMore(false)
    },
    [sentryRef] = useInfiniteScroll({
      loading: isLoadingMore,
      hasNextPage: pageInfo ? pageInfo.hasNextPage : false,
      onLoadMore: loadMore,
      disabled: !!error,
      rootMargin: '0px 0px 50px 0px',
    })

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
        <>
          {articles && articles.length ? (
            <>
              <div className={'card-grid row'}>
                {articles.map(({ article, cursor }) => {
                  return <Card key={cursor} data={article} />
                })}
              </div>
              {(isLoadingMore || pageInfo) && pageInfo.hasNextPage && (
                <div
                  ref={sentryRef}
                  className={'d-flex justify-content-center'}
                >
                  <div
                    className={'spinner-grow'}
                    style={{ width: '3rem', height: '3rem' }}
                    role={'status'}
                  >
                    <span className={'sr-only'}>
                      {isLoadingMore ? 'Loading' : 'Load More'}
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={'alert alert-info'} role={'alert'}>
              {'No Articles found'}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Main
