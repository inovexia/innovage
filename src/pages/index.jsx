import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import HomeBanner from '~/components/Homepage/banner'

const IndexPage = () => {
  const { wpgraphql } = useStaticQuery(
      graphql`
        query {
          wpgraphql {
            page(id: "cG9zdDo1", idType: ID) {
              pageId
              title(format: RENDERED)
              acfHomepage {
                bannerText
                bannerButtonLink
                bannerButtonText
                bannerVideo {
                  altText
                  mediaItemUrl
                }
                projects
                totalProjects
                happyClients
                totalHappyClients
                invested
                totalInvested
              }
            }
          }
        }
      `
    ),
    { acfHomepage } = wpgraphql.page

  return (
    <>
      <Seo
        title={`Innovage Softwares`}
        description={`We develop fast headless websites and Apps`}
      />
      <HomeBanner data={acfHomepage} />
    </>
  )
}

export default IndexPage
