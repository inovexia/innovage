import React from 'react'
import ReactHtmlParser from 'html-react-parser'

const ShopifyPageContent = ({ title, body }) => {
  return (
    <section className={'shopify-page'}>
      <div className={'container-fluid'}>
        <div className={'page-data'}>
          <div className={'page-title'}>
            <h1>{title}</h1>
          </div>
          <div className={'content'}>{ReactHtmlParser(body)}</div>
        </div>
      </div>
    </section>
  )
}

export default ShopifyPageContent
