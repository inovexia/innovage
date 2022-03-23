import React from 'react'

import isTablet from '~/components/functions/is-tablet'
import Desktop from './desktop'
import Tablet from './tablet'
import RelatedProducts from './related-products'

const Product = ({ imagesData, product, setProductRating }) => {
  return (
    <section className={'product'}>
      <div className={'container-fluid'}>
        <div className={'inner-wrapper'}>
          {isTablet() ? (
            <Tablet
              imagesData={imagesData}
              product={product}
              setProductRating={setProductRating}
            />
          ) : (
            <Desktop
              imagesData={imagesData}
              product={product}
              setProductRating={setProductRating}
            />
          )}
          <RelatedProducts
            title={'YOU MIGHT LIKE THESE'}
            ignoreProduct={product.title}
            tags={product.tags}
            sortKey={Math.round(Math.random()) ? 'CREATED_AT' : 'UPDATED_AT'}
            reverse={Math.round(Math.random()) ? true : false}
          />
        </div>
      </div>
    </section>
  )
}

export default Product
