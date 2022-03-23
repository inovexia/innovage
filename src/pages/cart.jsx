import React from 'react'
import { Link } from "gatsby"
import Seo from '~/components/seo'
import Cart from '~/components/Cart'

const CartPage = () => {
  return (
    <>
      <Seo title={'Cart'} description={''} />
      <Cart/>
      
    </>
  )
}

export default CartPage
