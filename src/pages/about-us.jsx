import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import AboutBanner from '~/components/About-us/banner'
import AboutUs from '~/components/About-us/about'
import CTASection from '~/components/CTA'

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
                  imageFile {
                    childImageSharp {
                      original {
                        src
                      }
                    }
                  }
                  sourceUrl(size: LARGE)
                  altText
                }
                aboutDetails {
                  aboutTitle
                  aboutDescription
                  aboutImage {
                    imageFile {
                      childImageSharp {
                        original {
                          src
                        }
                      }
                    }
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
      <CTASection />
    </>
  )
}

export default AboutUsPage
