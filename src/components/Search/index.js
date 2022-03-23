import React from 'react'

import Sidebar from './sidebar'
import Results from './results'

const Search = () => {
  return (
    <section className={'product-listing'}>
      <div className={'container-fluid'}>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'flex-shrink-1'}>
            <Sidebar />
          </div>
          <div className={'flex-grow-1'}>
            <Results />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Search
