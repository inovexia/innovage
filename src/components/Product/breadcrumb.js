import React from 'react'
import { Link } from 'gatsby'

const Breadcrumb = ({ title, link }) => (
  <div className={'bread-crumb'}>
    <Link className={'home'} to={'/'}>
      Home
    </Link>
    <span> &gt; </span>
    <Link className={'home'} to={'/all-products/'}>
      {'All Products'}
    </Link>
    <span> &gt; </span>
    <Link className={'home'} to={link}>
      <strong>{title}</strong>
    </Link>
  </div>
)

export default Breadcrumb
