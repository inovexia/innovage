import React from 'react'

import Sidebar from './sidebar'
import Results from './results'
import { graphql} from "gatsby"

const AllProducts = () => {
  return (
    <section className={'product-listing py-5'}>
      <div className={'container-fluid'}>
      <div className={'entry-header'}>
        <h2 className={'title'}>{'All Products'}</h2>
      </div>
        <div className={'d-flex flex-lg-row flex-column'}>
          <div className={'col-12 col-md-9'}>
            <Results />
          </div>
          <div className={'col-12 col-md-3'}>
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AllProducts


export const query = graphql`
query MyQuery {
  store {
    collections(first: 250) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
}

`

