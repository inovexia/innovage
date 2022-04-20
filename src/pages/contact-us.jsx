import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import ContactBanner from '~/components/Contact/banner'
import Contactform from '~/components/Contact/contactform'

const ContactUs = () => {
  const { wpgraphql } = useStaticQuery(
      graphql`
        query {
          wpgraphql {
            page(id: "cG9zdDo1OQ==", idType: ID) {
              title(format: RENDERED)
              pageId
              acfContactUs {
                addressLine1
                addressLine2
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
                contactDetails
                contactFormTitle
              }
            }
          }
        }
      `
    ),
    { title, acfContactUs } = wpgraphql.page
  return (
    <>
      <Seo title={title} description={`desc`} />
      <ContactBanner data={acfContactUs} title={title} />
      <Contactform data={acfContactUs} />
    </>
  )
}

export default ContactUs
