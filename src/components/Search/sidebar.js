import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'

import ListingSidebarData from '~/components/constants/pages/listing-sidebar-data'

const SideBar = () => {
  const _isMounted = useRef(true),
    [isTablet, setTablet] = useState(false),
    { options } = ListingSidebarData(),
    scrollToLink = element => {
      document.querySelector('.product-listing .side-bar').scrollLeft =
        element.offsetLeft - 20
    }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      _isMounted.current && setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        _isMounted.current && setTablet(window.outerWidth < 992 ? true : false)
      })
      document
        .querySelectorAll('.side-bar .options .option .link')
        .forEach(element => {
          if (window.location.pathname === element.getAttribute('href')) {
            isTablet && scrollToLink(element)
            element.classList.add('active')
          }
        })
      window.addEventListener('scroll', e => {
        if (!isTablet && _isMounted.current) {
          const header = document.querySelector('header'),
            sideBarContainer = document.querySelector(
              '.product-listing .side-bar-container'
            ),
            sideBar = document.querySelector('.product-listing .side-bar')

          if (window.scrollY <= sideBar.offsetTop - header.offsetHeight - 20) {
            sideBar.style.transform = `translateY(0)`
          } else if (
            window.scrollY >= sideBar.offsetTop - header.offsetHeight - 20 &&
            window.scrollY <=
              sideBar.offsetTop -
                header.offsetHeight -
                20 +
                (sideBarContainer.offsetHeight - sideBar.offsetHeight - 233)
          ) {
            sideBar.style.transform = `translateY(${
              window.scrollY - sideBar.offsetTop + header.offsetHeight + 20
            }px)`
          }
        }
      })
    }

    return () => {
      _isMounted.current = false
    }
  }, [isTablet, setTablet])

  return (
    <div className={'side-bar-container'}>
      <div className={'side-bar'}>
        {!isTablet && (
          <div className={'header'}>
            <h4>SHOP</h4>
          </div>
        )}
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
