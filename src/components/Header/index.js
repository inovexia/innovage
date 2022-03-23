import React, { useEffect } from 'react'
import HeaderData from '~/components/constants/header-data'

import MainHeader from './main-header'

const Header = () => {
  const {mainHeader } = HeaderData()

  return (
    <header>
      <MainHeader data={mainHeader} />
    </header>
  )
}

export default Header
