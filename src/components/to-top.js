/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React, { useEffect, useState } from 'react'
import { useIsMounted } from 'react-tidy'

import ArrUp from '~/components/icons/arr-up'

export default () => {
  const [isTop, setOnTop] = useState(true),
    isMounted = useIsMounted(),
    goToTop = () => {
      document.documentElement.style.scrollBehavior = 'smooth'
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      setTimeout(() => {
        document.documentElement.removeAttribute('style')
      }, 500)
    }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', e => {
        const { innerHeight, scrollY } = window,
          {
            body: { offsetHeight },
          } = document

        if (innerHeight + scrollY === offsetHeight) {
          isMounted() && setOnTop(false)
        } else {
          isMounted() && setOnTop(true)
        }
      })
    }
  }, [isMounted])

  return (
    <button
      onClick={() => goToTop()}
      aria-label={'Go to top'}
      className={!isTop ? 'btn-to-top show' : 'btn-to-top'}
    >
      <ArrUp height={25} />
    </button>
  )
}
