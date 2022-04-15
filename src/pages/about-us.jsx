import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import AboutBanner from '~/components/About-us/banner'
import AboutUs from '~/components/About-us/about'

const AboutUsPage = () => {
  const { wpgraphql } = useStaticQuery(
      graphql`
        query {
          wpgraphql {
            page(id: "cG9zdDo1Ng==", idType: ID) {
              pageId
              title(format: RENDERED)
              acfAbout {
                bannerDescription
                bannerImage {
                  altText
                  sourceUrl(size: LARGE)
                }
                aboutDetails {
                  aboutTitle
                  aboutDescription
                  aboutImage {
                    altText
                    sourceUrl(size: LARGE)
                  }
                }
              }
            }
          }
        }
      `
    ),
    { title, acfAbout } = wpgraphql.page
  return (
    <>
      <Seo title={title} description={`desc`} />
      <AboutBanner data={acfAbout} title={title} />
      <AboutUs data={acfAbout} />
    </>
  )
}

export default AboutUsPage
