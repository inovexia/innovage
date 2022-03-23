import React from 'react'

import Main from './main'

const ShopifyArticleContent = ({
  blogTitle,
  title,
  contentHtml,
  image,
  authorName,
  articleDate,
}) => {
  return (
    <section className={'single-blog'}>
      <div className={'container-fluid'}>
        <div className={'single-blog-data'}>
          <Main
            articleTitle={title}
            articleContent={contentHtml}
            articleImage={image}
            authorName={authorName}
            articleDate={articleDate}
          />
        </div>
      </div>
    </section>
  )
}

export default ShopifyArticleContent
