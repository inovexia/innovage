import React from 'react'

import Sidebar from './sidebar'
import Main from './Main'

const ProductCategory = ({ collectionData }) => {
  return (
    <section className={'product-listing'}>
      <div className={'container-fluid'}>
        <div className={'d-block d-md-flex flex-lg-row'}>
        <div className={'col-12 col-md-3 d-block d-md-none'}>
            <Sidebar />
          </div>
          <div className={'col-12 col-md-9'}>
            <Main collectionData={collectionData} />
          </div>
          <div className={'col-12 col-md-3 d-none d-md-block'}>
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductCategory
