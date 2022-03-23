import React from 'react'

import Sidebar from './side-bar'
import MobileSidebar from './mobile-sidebar'
import ProductReviewMain from './product-review-main'

const ProductReview = () => {
  return (
    <section className={'my-account'}>
      <div className={'d-block d-lg-none'}>
        <MobileSidebar />
      </div>
      <div className={'page-title'}>
        <h1>Account</h1>
      </div>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1 d-none d-lg-block'}>
            <Sidebar />
          </div>
          <div className={'flex-grow-1'}>
            <ProductReviewMain />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReview
