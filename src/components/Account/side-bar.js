import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import Logout from './logout'

const SideBar = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document
        .querySelectorAll('.side-bar .menu-wrapper li a')
        .forEach(element => {
          if (window.location.pathname === element.getAttribute('href'))
            element.classList.add('active')
        })
    }
  }, [])

  return (
    <div className={'side-bar'}>
      <div className={'menu-wrapper'}>
        <ul className={'menu'}>
          <li className={`default-page`}>Personal Information</li>
          <li>
            <Link to={'/account/'}>{'My Account'}</Link>
          </li>
          <li>
            <Link to={'/account/orders/'}>{'My Orders'}</Link>
          </li>
          <li>
            <Link to={'/account/address-book/'}>{'Address Book'}</Link>
          </li>
          {/*
          <li>
            <Link to={'/account/payment-methods/'}>{'Payment Methods'}</Link>
          </li>
          <li>
            <Link to={'/account/product-reviews/'}>{'Product Reviews'}</Link>
          </li>
          */}
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
