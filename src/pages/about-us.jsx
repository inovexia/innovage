import React, { Component } from 'react'
import { graphql} from "gatsby"

import Seo from '~/components/seo'

const AboutUsPage = () => {
 
  return (
    <>
      <Seo title={ `title`} description={`desc`}/>
      <div>About Us</div>
      
    </>
  )
}

export default AboutUsPage