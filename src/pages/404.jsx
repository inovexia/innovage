import React from 'react'
import Seo from '~/components/seo'

const NotFoundPage = () => (
  <>
    <Seo title={'404: Not found'} />
    <div
      className={
        'd-flex flex-column h-100 justify-content-center align-items-center'
      }
    >
      <h1 className={'mb-3 display-1 align-top border-right'}>404</h1>
      <h2 className={'display-4'}>The page you requested was not found.</h2>
      <p>Please try using our search to find the right page</p>
    </div>
  </>
)

export default NotFoundPage
