import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'

const Footer = () => {
  const { wpgraphql } = useStaticQuery(graphql`
    query FooterQuery {
      wpgraphql {
        themeOptions {
          acfFooter {
            addressLine1
            addressLine2
            copyrightText
            footerLogo {
              altText
              sourceUrl
            }
            footerMenu {
              footerMenuLabel
              footerMenuLink
            }
            socialIcons {
              icon
              socialLink
            }
          }
        }
      }
    }
  `)
  return (
    <footer className={`py-5`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12 col-md-3`}>
            <div className={`footer-left`}>
              <Link to={'/'} className={`logo`}>
                <img
                  loading={'lazy'}
                  src={wpgraphql.themeOptions.acfFooter.footerLogo.sourceUrl}
                  alt={wpgraphql.themeOptions.acfFooter.footerLogo.altText}
                  className={`mb-0`}
                />
              </Link>
              <p className={`text-white`}>
                {wpgraphql.themeOptions.acfFooter.addressLine1}
              </p>
              <p className={`text-white`}>
                {wpgraphql.themeOptions.acfFooter.addressLine2}
              </p>
            </div>
          </div>
          <div className={`col-12 col-md-6`}>
            <div className={`footer-center h-100 d-md-flex align-items-center`}>
              <div className={`footer-center-content w-100`}>
                <ul
                  className={`h-100 m-0 d-md-flex footer-menu p-0 justify-content-md-center`}
                >
                  {wpgraphql.themeOptions.acfFooter &&
                    wpgraphql.themeOptions.acfFooter.footerMenu.map(
                      ({ footerMenuLabel, footerMenuLink }, index) => {
                        return (
                          <li key={index} className={`m-0 m-md-3`}>
                            <Link
                              to={footerMenuLink}
                              className={'link text-white text-decoration-none'}
                            >
                              {footerMenuLabel}
                            </Link>
                          </li>
                        )
                      }
                    )}
                </ul>
                <p className={`text-white text-center`}>
                  {wpgraphql.themeOptions.acfFooter.copyrightText}
                </p>
              </div>
            </div>
          </div>
          <div className={`col-12 col-md-3`}>
            <div
              className={`footer-right h-100 d-flex align-items-center align-items-center`}
            >
              <ul
                className={`w-100 footer-social-icon d-flex justify-content-end`}
              >
                {wpgraphql.themeOptions.acfFooter &&
                  wpgraphql.themeOptions.acfFooter.socialIcons.map(
                    ({ icon, socialLink }, index) => {
                      return (
                        <li key={index} className={`ms-3`}>
                          <Link to={socialLink} className={'link text-white'}>
                            {ReactHtmlParser(icon)}
                          </Link>
                        </li>
                      )
                    }
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
