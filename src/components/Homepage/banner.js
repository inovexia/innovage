import React from 'react'
import { Link } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'
import CountUp from 'react-countup'

import Earth from '../Icons/earth'

const HomeBanner = ({ data }) => {
  console.log(data)
  return (
    <>
      <section>
        <div className={`container-fluid`}>
          <div className={`home-banner position-relative`}>
            <video autoplay="true" muted loop="true">
              <source src={data.bannerVideo.mediaItemUrl} type="video/mp4" />
            </video>
            <div className={`banner-content`}>
              <h1 className={`h1-text`}>{ReactHtmlParser(data.bannerText)}</h1>
              <Link to={data.bannerButtonLink} className={`inv-primary-btn`}>
                {data.bannerButtonText}
              </Link>
            </div>
            <div className={`ribbon`}>
              <div className={`row`}>
                <div className={`col-12 col-md-4`}>
                  <div className={`ribbon-data`}>
                    <Earth />
                    <CountUp start={0} end={data.totalProjects} duration={3}>
                      {data.totalProjects}
                    </CountUp>
                    + {data.projects}
                  </div>
                </div>
                <div className={`col-12 col-md-4`}>
                  <div classname={`ribbon-data`}>3</div>
                </div>
                <div className={`col-12 col-md-4`}>
                  <div classname={`ribbon-data`}>3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeBanner
