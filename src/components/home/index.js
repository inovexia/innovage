import React from 'react'
import CollectionsSlider from "./collections"
import FeaturedProducts from "./featureproducts"

const HomePage = ({data, story}) => { 
  
  return (
      <>
        <CollectionsSlider data={data}/>
        <FeaturedProducts data={data}/>
   
      </>
  )
}
export default HomePage
