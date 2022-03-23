import React from 'react'

import Breadcrumb from './breadcrumb'
import ProductFormTablet from './product-form-tablet'
import KeyIngredients from './key-ingredients'
import Reviews from './reviews'
// import SeenOnInstagram from './seen-on-instagram'
import AboutUs from './about-us'

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
      {/* {process.env.NODE_ENV === 'development' && <SeenOnInstagram />} */}
      <AboutUs />
    </div>
  )
}
export default Tablet
