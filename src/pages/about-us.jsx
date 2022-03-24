import React, { Component } from 'react'
import { graphql} from "gatsby"
import { render} from 'storyblok-rich-text-react-renderer'

import Seo from '~/components/seo'
import AboutUs from '~/components/AboutUs'

const AboutUsPage = ({data}) => {
  const story = data.storyblokEntry
  const content = JSON.parse(story.content)
  !false &&  console.log(content)
  return (
    <>
      <Seo title={Component.page_title} description={ render(story.content.about_banner_subtitle) }/>
      <AboutUs data={content} />
      
    </>
  )
}

export default AboutUsPage
export const query = graphql`
  query AboutQuery {
    storyblokEntry(full_slug: { eq: "about-us" }) {
      content
    }
  }
`