import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import WorkBanner from '~/components/Our-Work/banner'
import Services from '~/components/Services/our-services'
import OurProcess from '~/components/Services/our-process'

const OurServices = () => {
  const { wpgraphql } = useStaticQuery(
      graphql`
        query {
          wpgraphql {
            page(id: "cG9zdDo2Mg==", idType: ID) {
              pageId
              title(format: RENDERED)

              acfServices {
                bannerDescription
                bannerImage {
                  altText
                  sourceUrl(size: LARGE)
                }

                serviceEntryTitle
                services {
                  serviceDescription
                  serviceTitle
                  serviceImage {
                    altText
                    sourceUrl(size: LARGE)
                  }
                }

                processEntryTitle
                ourProcess {
                  title
                  description
                  processImage {
                    sourceUrl(size: LARGE)
                    altText
                  }
                }
              }
            }
          }
        }
      `
    ),
    { title, acfServices } = wpgraphql.page

  return (
    <>
      <Seo
        title={title}
        description={`We develop fast headless websites and Apps`}
      />
      <WorkBanner data={acfServices} title={title} />
      <Services data={acfServices} />
      <OurProcess data={acfServices} />
    </>
  )
}

export default OurServices
