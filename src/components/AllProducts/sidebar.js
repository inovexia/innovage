import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'

import ListingSidebarData from '~/components/constants/pages/listing-sidebar-data'

const SideBar = () => {
  return (
    <div className={'side-bar-outer'}>
      <div className={'side-bar ml-0'}>
        <div className={'header'}>
          <h4>Categories</h4>
        </div>

        <ul className={'options'}>
          <li>
            <Link to={`/collections/men-watches/`}>Men Watches</Link>
          </li>
          <li>
            <Link to={`/collections/mobiles/`}>Mobiles</Link>
          </li>
          <li>
            <Link to={`/collections/men-tshirts/`}>Men T-Shirts</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
