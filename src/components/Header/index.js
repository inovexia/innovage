import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

//import HeaderData from '../constants/header-data'
import { Navbar, Nav } from 'react-bootstrap'
import Hamburger from '../Icons/hamburger'

const Header = () => {
  const { wpgraphql } = useStaticQuery(graphql`
    query HeaderQuery {
      wpgraphql {
        themeOptions {
          acfHeader {
            headerLogo {
              altText
              sourceUrl(size: MEDIUM)
            }
            mainMenu {
              mainMenuLabel
              mainMenuLink
            }
          }
        }
      }
    }
  `)

  return (
    <header>
      <Navbar collapseOnSelect expand="lg">
        <div className={`container-fluid`}>
          <Link to={'/'} className={`logo`}>
            <img
              loading={'lazy'}
              src={wpgraphql.themeOptions.acfHeader.headerLogo.sourceUrl}
              alt={wpgraphql.themeOptions.acfHeader.headerLogo.altText}
              className={`mb-0`}
            />
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <Hamburger />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="w-100 justify-content-md-end">
              {wpgraphql.themeOptions.acfHeader &&
                wpgraphql.themeOptions.acfHeader.mainMenu.map(
                  ({ mainMenuLabel, mainMenuLink }, index) => {
                    return (
                      <Link to={mainMenuLink} className={'link'} key={index}>
                        {mainMenuLabel}
                      </Link>
                    )
                  }
                )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  )
}

export default Header
