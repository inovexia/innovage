import React from 'react'

import ProductFormTablet from './product-form-tablet'
import KeyIngredients from './key-ingredients'
import Reviews from './reviews'
// import SeenOnInstagram from './seen-on-instagram'

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
      <ProductFormTablet imagesData={imagesData} product={product} />
      <KeyIngredients product={product} />
      <Reviews product={product} setProductRating={setProductRating} />
    </div>
  )
}
export default Tablet
