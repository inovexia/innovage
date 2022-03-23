import React from 'react'
import { graphql, Link } from "gatsby"
import Seo from '~/components/seo'
import ContactUsData from '~/components/constants/pages/contact-us-data'
import Contact from '~/components/Contact'

const ContactUs = ({data, location}) => {
  const story = data.storyblokEntry
  const content = JSON.parse(story.content)
  const { seoData, mainData } = ContactUsData(),
    { title, description } = seoData
    console.log(content)

  return (
    <>
      <Seo title={title} description={description} />
      <Contact data={content} />
    </>
  )
}

export default ContactUs

export const query = graphql`
  query ContactQuery {
    storyblokEntry(full_slug: { eq: "contact" }) {
      content
    }
  }
`

