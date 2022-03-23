import React from 'react'
import HomeBanner from "./banner"
import CollectionsSlider from "./collections"
import FeaturedProducts from "./featureproducts"
import AboutSection from "./about"
import CTA from "./cta"
import Testimonials from "./testimonials"

const HomePage = ({data, story}) => { 
  
  return (
      <>
        <CollectionsSlider data={data}/>
        <FeaturedProducts data={data}/>
        {/* <CTA blok={blok}/>
        <Testimonials blok={blok}/> */}
   
      </>
  )
}
export default HomePage
