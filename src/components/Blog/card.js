import React from 'react'
import { Link } from 'gatsby'

import FormatDate from '~/components/functions/format-date'

const Card = ({
  data: {
    authorV2: { name },
    blog: { handle: blogHandle },
    content,
    handle: articleHandle,
    image,
    publishedAt,
    title,
  },
}) => {
  const articleDate = new Date(publishedAt)

  return (
    <div className={'blog-card col-12 col-md-4'}>
      <div className={`blog-card-inner`}>
        <div className={'inner-card'}>
          <Link to={`/blog/${articleHandle}/`}>
            <img className={'blog-image'} alt={image.altText} src={image.url} />
          </Link>
        </div>
        <div className={'blog-data'}>
          <div className={'card-data d-flex justify-content-between pb-2'}>
            <p className={`m-0`}>
              Posted by <strong>{name}</strong>
            </p>
            <p className={`m-0`}>{FormatDate(articleDate, 'MMM dd, yyyy')}</p>
          </div>
          <Link className={'blog-title'} to={`/blog/${articleHandle}/`}>
            {title}
          </Link>
          <div className={'social-media-icon'}>
            <Link
              className={'btn btn-demo-primary'}
              to={`/blog/${articleHandle}/`}
            >
              READ MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
