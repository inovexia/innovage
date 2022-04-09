import React from 'react'
import { Link } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'
import CountUp from 'react-countup'

import Earth from '../Icons/earth'

const HomeBanner = ({ data }) => {
  const {
    bannerText,
    bannerButtonLink,
    bannerButtonText,
    bannerVideo,
    projects,
    totalProjects,
    happyClients,
    totalHappyClients,
    invested,
    totalInvested,
  } = data

  return (
    <>
      <section>
        <div className={`container-fluid`}>
          <div className={`home-banner position-relative`}>
            <video autoplay="true" muted loop="true">
              <source src={bannerVideo.mediaItemUrl} type="video/mp4" />
            </video>
            <div className={`banner-content`}>
              <h1 className={`h1-text`}>{ReactHtmlParser(bannerText)}</h1>
              <Link to={bannerButtonLink} className={`inv-primary-btn`}>
                {bannerButtonText}
              </Link>
            </div>
            <div className={`ribbon`}>
              <div className={`row`}>
                <div className={`col-12 col-md-4 my-3 my-md-0`}>
                  <div className={`ribbon-data`}>
                    <span className={`ribbon-icon`}>
                      <Earth />
                    </span>
                    <CountUp start={0} end={totalProjects} duration={3}>
                      {totalProjects}
                    </CountUp>
                    + {projects}
                  </div>
                </div>
                <div className={`col-12 col-md-4 my-3 my-md-0`}>
                  <div className={`ribbon-data`}>
                    <span className={`ribbon-icon`}>
                      <Earth />
                    </span>
                    <CountUp start={0} end={totalHappyClients} duration={3}>
                      {totalHappyClients}
                    </CountUp>
                    + {happyClients}
                  </div>
                </div>
                <div className={`col-12 col-md-4 my-3 my-md-0`}>
                  <div className={`ribbon-data`}>
                    <span className={`ribbon-icon`}>
                      <Earth />
                    </span>
                    <CountUp start={0} end={totalInvested} duration={3}>
                      {totalInvested}
                    </CountUp>
                    + {invested}
                  </div>
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
