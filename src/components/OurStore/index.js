import React, { useEffect, useState } from 'react'
import { useIsMounted } from 'react-tidy'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactHtmlParser from 'html-react-parser'

import Logo from '~/components/icons/logo'

const OurStore = ({
  data: {
    leftImage,
    leftImageLg,
    followUsText,
    followUsBtnText,
    followUsBtnLink,
    bottomTitle,
    storeAddress,
  },
}) => {
  const isMounted = useIsMounted(),
    [isTablet, setTablet] = useState(false)

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener('resize', () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })
    }
  }, [isMounted, setTablet])

  return (
    <section className={'follow-us'}>
      <div className={'follow-us-content'}>
        <div className={'row gx-0'}>
          {isTablet && (
            <div className={'col col-12 store-mob-data'}>
              <div className={'logo-box'}>
                <Logo />
              </div>
              <div className={'follow-box'}>
                <h3>{followUsText}</h3>
                <a
                  className={'btn btn-demo-primary'}
                  href={followUsBtnLink}
                  target={'_blank'}
                  rel={'nofollow noreferrer'}
                >
                  {followUsBtnText}
                </a>
              </div>
            </div>
          )}
          <div className={'col col-12 col-lg-6'}>
            <div className={'follow-left-part'}>
              <GatsbyImage
                image={
                  isTablet
                    ? leftImage.childImageSharp.gatsbyImageData
                    : leftImageLg.childImageSharp.gatsbyImageData
                }
                alt={'left-image'}
                className={'banner-image w-100'}
              />
            </div>
          </div>
          <div className={'col col-12 col-lg-6'}>
            <div className={'row mx-0 follow-right'}>
              {!isTablet && (
                <div className={'follow-top'}>
                  <div className={'logo-box'}>
                    <Logo />
                  </div>
                  <div className={'follow-box'}>
                    <h3>{followUsText}</h3>
                    <a
                      className={'btn btn-demo-primary'}
                      href={followUsBtnLink}
                      target={'_blank'}
                      rel={'nofollow noreferrer'}
                    >
                      {followUsBtnText}
                    </a>
                  </div>
                </div>
              )}
              <div className={'follow-bottom'}>
                <div className={'bottom-content'}>
                  <h3>{bottomTitle}</h3>
                  {ReactHtmlParser(storeAddress)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStore
