import React from 'react'
import Seo from '~/components/seo'

import AllProducts from '~/components/AllProducts'

const AllProductsPage = () => {
  return (
    <>
      <Seo title={'All Products'} />
      <AllProducts />
    </>
  )
}

export default AllProductsPage
