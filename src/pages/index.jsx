import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seo from '../components/seo'
import HomeBanner from '~/components/Homepage/banner'
import WeDevelop from '~/components/Homepage/we-develop'
import WhatWeDo from '~/components/Homepage/what-we-do'
import OurWork from '~/components/Homepage/our-work'
import BeautifullTemplates from '~/components/Homepage/beautifull-templates'
import DevelopApp from '~/components/Homepage/develop-app'
import Testimonials from '~/components/testimonials'
import CTASection from '~/components/CTA'

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

                weDevelopTitle
                weDevelopDescription
                weDevelopButtonText
                weDevelopButtonLink

                whatWeDoTitle
                whatWeDo {
                  description
                  fieldGroupName
                  title
                  iconImage {
                    altText
                    sourceUrl(size: LARGE)
                  }
                }
                ourWorkTitle

                project1Title
                project1Link
                project1Technology
                project1Description
                project1Image {
                  altText
                  imageFile {
                    childImageSharp {
                      original {
                        src
                      }
                    }
                  }
                  sourceUrl(size: LARGE)
                }

                project2Title
                project2Link
                project2Technology
                project2Description
                project2Image {
                  altText
                  imageFile {
                    childImageSharp {
                      original {
                        src
                      }
                    }
                  }
                  sourceUrl(size: LARGE)
                }

                project3Title
                project3Link
                project3Technology
                project3Description
                project3Image {
                  altText
                  imageFile {
                    childImageSharp {
                      original {
                        src
                      }
                    }
                  }
                  sourceUrl(size: LARGE)
                }

                templateSectionTitle
                keyFeatures {
                  features
                }
                templateViewMoreButtonText
                templateViewMoreLink
                templateSectionImage {
                  altText
                  sourceUrl(size: LARGE)
                }

                developAppTitle
                developApp {
                  app
                }
                developButtonText
                developButtonLink
                appImage {
                  altText
                  sourceUrl(size: LARGE)
                }
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
      <WeDevelop data={acfHomepage} />
      <WhatWeDo data={acfHomepage} />
      <OurWork data={acfHomepage} />
      <BeautifullTemplates data={acfHomepage} />
      <DevelopApp data={acfHomepage} />
      <Testimonials />
      <CTASection />
    </>
  )
}

export default IndexPage
