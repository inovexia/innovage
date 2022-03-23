import React from 'react'
import ReactHtmlParser from 'html-react-parser'
import { Link } from 'gatsby'

import FormatDate from '~/components/functions/format-date'
import isTablet from '~/components/functions/is-tablet'

const Main = ({
  authorName,
  articleTitle,
  articleContent,
  articleImage,
  articleDate,
}) => {
  return (
    <div className={'blog-content d-block d-md-flex'}>
      {!isTablet() && (
        <div className={'blog-thumbnail col-12 col-md-6'}>
          <img
            src={articleImage.url}
            alt={articleTitle}
            className={`w-100 mb-3 ${articleTitle.toLowerCase()}`}
          />
        </div>
      )}
      <div className={'content col-12 col-md-6 ps-0 ps-md-4'}>
        <div className={'breadcrumb-box d-none  '}>
          <p>
            <Link to={'/'}>Home</Link> <span> &gt; </span>{' '}
            <Link to={'/blog/'}>Blog</Link> <span> &gt; </span>{' '}
            <strong>{articleTitle}</strong>{' '}
          </p>
        </div>
        <h1 className={'blog-title'}>{articleTitle}</h1>
        {isTablet() && (
          <div className={'mobile-thumbnail'}>
            <img
              src={articleImage.url}
              alt={articleTitle}
              className={`w-100 ${articleTitle.toLowerCase()}`}
            />
          </div>
        )}
        <div className={'meta-data'}>
          By <strong>{authorName}</strong> on{' '}
          <strong>{FormatDate(articleDate, 'MMM dd, yyyy')}</strong>
        </div>
        <div className={'description'}>
          {ReactHtmlParser(
            articleContent.replace(/\n|\t/g, '').replace('> <', '><')
          )}
        </div>
      </div>
    </div>
  )
}

export default Main
