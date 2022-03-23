import React from 'react'
import { useIsMounted } from 'react-tidy'
import { Link } from 'gatsby'
import FormatDate from '~/components/functions/format-date'

const ArticleBox = ({
  article: {
    authorV2,
    handle,
    title,
    image ,
    publishedAt
  },
}) => {
    const articleDate = new Date(publishedAt)
  const isMounted = useIsMounted()
  return (
    isMounted() && (
        <div className={'blog-card col-12 col-md-4'}>
        <div className={`blog-card-inner`}>
          <div className={'inner-card'}>
            <Link to={`/blog/${handle}/`}>
              <img className={'blog-image w-100'} alt={image.altText} src={image.url} />
            </Link>
          </div>
          <div className={'blog-data'}>
            <div className={'card-data d-flex justify-content-between pb-2'}>
              <p className={`m-0`}>
                Posted by <strong>{authorV2.name}</strong>
              </p>
              <p className={`m-0`}>{FormatDate(articleDate, 'MMM dd, yyyy')}</p>
            </div>
            <Link className={'blog-title'} to={`/blog/${handle}/`}>
              {title}
            </Link>
            <div className={'social-media-icon'}>
              <Link
                className={'btn btn-demo-primary'}
                to={`/blog/${handle}/`}
              >
                READ MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ArticleBox
