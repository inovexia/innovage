import React from 'react'

import onSale from '~/components/functions/on-sale'
import Gallery from './gallery'
import ProductForm from './product-form'
import KeyIngredients from './key-ingredients'
import Reviews from './reviews'

const Desktop = ({
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
      <div className={'flex-shrink-1'}>
        <div className={'d-flex h-100 flex-column'}>
          <div className={'gallery'}>
            <Gallery
              images={imagesData.images}
              // images={product.images.edges}
              onSale={onSale(product.tags)}
            />
          </div>
        </div>
      </div>
      <div className={'flex-shrink-1'}>
        <div className={'info'}>
          <ProductForm product={product} />
          <KeyIngredients product={product} />
          <Reviews product={product} setProductRating={setProductRating} />
        </div>
      </div>
    </div>
  )
}

export default Desktop
