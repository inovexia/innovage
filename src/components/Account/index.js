import React from 'react'

import Sidebar from './side-bar'
import MobileSidebar from './mobile-sidebar'
import AccountMain from './account-main'

const Account = () => {
  return (
    <section className={'my-account'}>
     
      <div className={`container-fluid`}>
      <div className={'d-block d-lg-none'}>
        <MobileSidebar />
      </div>
      <div className={'page-title'}>
        <h1>My Account</h1>
      </div>
      </div>
      
      <div className={'container-fluid'}>
        <div className={'row pb-5'}>
          <div className={'col-3 d-none d-lg-block'}>
            <Sidebar />
          </div>
          <div className={'col-12 col-lg-9'}>
            <AccountMain />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Account
