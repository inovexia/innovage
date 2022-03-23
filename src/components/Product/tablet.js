import React from 'react'

import Breadcrumb from './breadcrumb'
import ProductFormTablet from './product-form-tablet'
import KeyIngredients from './key-ingredients'
import Reviews from './reviews'

export const Tablet = ({
  imagesData,
  product,
  setProductRating,
  product: {
    collections: {
      edges: [primaryCollection],
    },
  },
}) => {
  return (
    <div className={'product-content'}>
      <div className={'info'}>
        <Breadcrumb
          title={primaryCollection.node.title}
          link={`/collections/${primaryCollection.node.handle}/`}
        />
      </div>
      <ProductFormTablet imagesData={imagesData} product={product} />
      <KeyIngredients product={product} />
      <Reviews product={product} setProductRating={setProductRating} />
    </div>
  )
}
export default Tablet
