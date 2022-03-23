import React from 'react'

import Seo from '~/components/seo'
import AboutUsData from '~/components/constants/pages/about-us-data'
import AboutUs from '~/components/AboutUs'
import GallerySlider from '~/components/AboutUs/gallerySlider'

const AboutUsPage = () => {
  const { seoData, mainData, gallery } = AboutUsData(),
    { title, description } = seoData

  return (
    <>
      <Seo title={title} description={description} />
      {/* <AboutUs data={mainData} />
      <GallerySlider data={gallery} /> */}
    </>
  )
}

export default AboutUsPage
