import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'

import BlogSidebarData from '~/components/constants/pages/blog-sidebar-data'

const SideBar = () => {
    const _isMounted = useRef(true),
    { options } = BlogSidebarData()
  return (
    <div className={'side-bar-outer'}>
      <div className={'side-bar ml-0'}>
        <div className={'header'}>
          <h4>Blogs Categories</h4>
        </div>

        {options.length > 0 && (
          <ul className={'options'}>
            {options.map(({ link, label }, index) => {
              return (
                <li className={'option'} key={index}>
                  <Link to={link} className={'link'}>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SideBar
