import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactHtmlParser from 'html-react-parser'

const Hero = ({
  data: {
    heroLeft,
    heroLeftLg,
    heroRight,
    heroRightLg,
    heroTitle,
    heroDescription,
    heroBtnText,
    heroBtnLink,
  },
}) => {
  const [isTablet, setTablet] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })
    }
  }, [setTablet])

  return (
    <section className={'hero'}>
      <div className={'wrapper'}>
        <div className={'hero-content row gx-0'}>
          <div className={'col-lg-4'}>
            <div className={'banner-left-part w-100 text-center'}>
              <GatsbyImage
                image={
                  isTablet
                    ? heroLeft.childImageSharp.gatsbyImageData
                    : heroLeftLg.childImageSharp.gatsbyImageData
                }
                alt={'left-image'}
                className={'banner-image'}
              />
            </div>
          </div>
          <div className={'col-lg-4'}>
            <div className={'banner-middle-part'}>
              <div className={'banner-middle-content'}>
                <h1 className={'text-center'}>{ReactHtmlParser(heroTitle)}</h1>
                {ReactHtmlParser(heroDescription)}
                <Link to={heroBtnLink} className={'btn btn-demo-primary'}>
                  {heroBtnText}
                </Link>
              </div>
            </div>
          </div>
          <div className={'col-lg-4'}>
            <div className={'banner-right-part text-center'}>
              <GatsbyImage
                image={
                  isTablet
                    ? heroRight.childImageSharp.gatsbyImageData
                    : heroRightLg.childImageSharp.gatsbyImageData
                }
                alt={'right-image'}
                className={'banner-image'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
