import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import WorkBanner from '~/components/Our-Work/banner'
import OurProjects from '~/components/Our-Work/our-projects'
import CTASection from '~/components/CTA'

const OurServices = () => {
  const { wpgraphql } = useStaticQuery(
      graphql`
        query {
          wpgraphql {
            page(id: "cG9zdDo2NQ==", idType: ID) {
              pageId
              title(format: RENDERED)
              acfOurWork {
                bannerDescription
                bannerImage {
                  altText
                  sourceUrl(size: MEDIUM)
                  imageFile {
                    childImageSharp {
                      original {
                        src
                      }
                    }
                  }
                }
                projectEntryTitle
                projects {
                  projectName
                  projectDescription
                  projectLink
                  buttonText
                  projectImage {
                    altText
                    sourceUrl(size: MEDIUM)
                    imageFile {
                      childImageSharp {
                        original {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    ),
    { title, acfOurWork } = wpgraphql.page

  return (
    <>
      <Seo
        title={title}
        description={`We develop fast headless websites and Apps`}
      />
      <WorkBanner data={acfOurWork} title={title} />
      <OurProjects data={acfOurWork} />
      <CTASection />
    </>
  )
}

export default OurServices
