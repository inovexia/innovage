import React, { useEffect, useState } from 'react'
import Seo from '~/components/seo'

import isBrowser from '~/components/functions/is-browser'
import Search from '~/components/Search'

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isBrowser) {
      const params = new URLSearchParams(window.location.search)
      params.get('s') && setSearchQuery(params.get('s'))
    }
  }, [setSearchQuery])
  return (
    <>
      <Seo title={`Search Results: ${searchQuery}`} />
      <Search />
    </>
  )
}

export default SearchPage
