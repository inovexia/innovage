import React from 'react'

import Seo from '~/components/seo'
import Layout from '~/components/customer/Layout'
import Account from '~/components/Account'

const AccountIndexPage = () => {
  return (
    <Layout>
      <Seo title={'My Account'} description={''} />
      <Account />
    </Layout>
  )
}

export default AccountIndexPage
