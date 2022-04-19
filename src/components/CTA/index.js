import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'

const CTASection = () => {
  const { wpgraphql } = useStaticQuery(graphql`
    query CtaQuery {
      wpgraphql {
        themeOptions {
          acfCTA {
            ctaTitle
            ctaDescription
            ctaButtonText
            ctaButtonLink
          }
        }
      }
    }
  `)

  return (
    <section className={`cta-section`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div className={`cta-content d-md-flex`}>
              <div className={`cta-left`}>
                <h2>{wpgraphql.themeOptions.acfCTA.ctaTitle}</h2>
                {ReactHtmlParser(wpgraphql.themeOptions.acfCTA.ctaDescription)}
              </div>
              <div className={`cta-right mt-3 mt-md-0`}>
                <Link
                  to={wpgraphql.themeOptions.acfCTA.ctaButtonLink}
                  className={`inv-primary-btn`}
                >
                  {wpgraphql.themeOptions.acfCTA.ctaButtonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
