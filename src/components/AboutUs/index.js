import React, { useEffect, useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactHtmlParser from 'html-react-parser'

const AboutUs = ({
  data: {
    pageTitle,
    aboutUsTitle,
    aboutUsDescription,
    aboutUsImage,
    aboutUsImageLg,
    section2Image,
    section2Description,
    section3Image,
    section3Description,
    section4Image,
    section4Description,
    gallery,
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
    <section className={'about-us'}>
      <div className={'inner-wrapper'}>
        <div className={'row gx-0 section1'}>
          <div className={'col col-12 col-lg-6 text-col'}>
            <div className={'about-us-left'}>
              <div className={'left-content'}>
                <h1>{aboutUsTitle}</h1>
                <p>{ReactHtmlParser(aboutUsDescription)}</p>
              </div>
            </div>
          </div>
          <div className={'col col-12 col-lg-6 img-col'}>
            <div className={'about-us-right'}>
              <GatsbyImage
                image={
                  isTablet
                    ? aboutUsImage.childImageSharp.gatsbyImageData
                    : aboutUsImageLg.childImageSharp.gatsbyImageData
                }
                alt={'left-image'}
                className={'w-100'}
              />
            </div>
          </div>
        </div>
        <div className={'row gx-0 section2'}>
          <div className={'col col-12 col-lg-6 order-2 order-lg-1 img-col'}>
            <div className={'about-us-right'}>
              <GatsbyImage
                image={
                  isTablet
                    ? section2Image.childImageSharp.gatsbyImageData
                    : section2Image.childImageSharp.gatsbyImageData
                }
                alt={'left-image'}
                className={'w-100'}
              />
            </div>
          </div>
          <div className={'col col-12 col-lg-6 order-1 order-lg-2 text-col'}>
            <div className={'about-us-left'}>
              <div className={'content'}>
                <p>{ReactHtmlParser(section2Description)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={'row gx-0 section3'}>
          <div className={'col col-12 col-lg-6 text-col'}>
            <div className={'about-us-left'}>
              <div className={'left-content'}>
                <p>{ReactHtmlParser(section3Description)}</p>
              </div>
            </div>
          </div>
          <div className={'col col-12 col-lg-6 img-col'}>
            <div className={'about-us-right'}>
              <GatsbyImage
                image={
                  isTablet
                    ? section3Image.childImageSharp.gatsbyImageData
                    : section3Image.childImageSharp.gatsbyImageData
                }
                alt={'left-image'}
                className={'w-100'}
              />
            </div>
          </div>
        </div>
        <div className={'row gx-0 section4 d-none d-lg-flex'}>
          <div className={'col col-12 col-lg-6 order-2 order-lg-1 img-col'}>
            <div className={'about-us-right'}>
              <GatsbyImage
                image={
                  isTablet
                    ? section4Image.childImageSharp.gatsbyImageData
                    : section4Image.childImageSharp.gatsbyImageData
                }
                alt={'left-image'}
                className={'w-100'}
              />
            </div>
          </div>
          <div className={'col col-12 col-lg-6 order-1 order-lg-2 text-col'}>
            <div className={'about-us-left'}>
              <div className={'content'}>
                {ReactHtmlParser(section4Description)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
