import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import WorkBanner from '~/components/Our-Work/banner'
import OurProjects from '~/components/Our-Work/our-projects'

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
                  sourceUrl(size: LARGE)
                }
                projectEntryTitle
                projects {
                  projectName
                  projectDescription
                  projectLink
                  buttonText
                  projectImage {
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
    { title, acfOurWork } = wpgraphql.page

  return (
    <>
      <Seo
        title={title}
        description={`We develop fast headless websites and Apps`}
      />
      <WorkBanner data={acfOurWork} title={title} />
      <OurProjects data={acfOurWork} />
    </>
  )
}

export default OurServices