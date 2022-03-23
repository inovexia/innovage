import React from 'react'

import Seo from '~/components/seo'
import ContactUsData from '~/components/constants/pages/contact-us-data'
import Contact from '~/components/Contact'

const ContactUs = () => {
  const { seoData, mainData } = ContactUsData(),
    { title, description } = seoData

  return (
    <>
      <Seo title={title} description={description} />
      {/* <Contact data={mainData} /> */}
    </>
  )
}

export default ContactUs
