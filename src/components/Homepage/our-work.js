import React from 'react'
import { Link } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'

const OurWork = ({ data }) => {
  const {
    ourWorkTitle,
    project1Title,
    project1Link,
    project1Technology,
    project1Description,
    project1Image,
    project2Title,
    project2Link,
    project2Technology,
    project2Description,
    project2Image,
    project3Title,
    project3Link,
    project3Technology,
    project3Description,
    project3Image,
  } = data
  return (
    <section className={`our-work`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div className={`our-work-header`}>
              <h2 className={`h2-text`}>{ourWorkTitle}</h2>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-12 col-md-6 left mb-5 mb-md-0 pos-value`}>
            <div className={`project-image`}>
              <img
                src={project1Image.sourceUrl}
                alt={project1Image.altText}
                className={`w-100`}
              />
              <Link to={project1Link} className={`inv-secondary-btn`}>
                Learn More
              </Link>
            </div>
          </div>
          <div className={`col-12 col-md-6 right mb-5 mb-md-0`}>
            <div className={`project-details`}>
              <h5 className={`h5-text`}>{project1Title}</h5>
              {ReactHtmlParser(project1Description)}
              <span>{project1Technology}</span>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div
            className={`col-12 col-md-6 left order-2 order-md-1 mb-5 mb-md-0 pos-value`}
          >
            <div className={`project-details content-right`}>
              <h5 className={`h5-text`}>{project2Title}</h5>
              {ReactHtmlParser(project2Description)}
              <span>{project2Technology}</span>
            </div>
          </div>
          <div
            className={`col-12 col-md-6 right order-1 order-md-2 mb-5 mb-md-0`}
          >
            <div className={`project-image`}>
              <img
                src={project2Image.sourceUrl}
                alt={project2Image.altText}
                className={`w-100`}
              />
              <Link to={project2Link} className={`inv-secondary-btn`}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div
            className={`col-12 col-md-6 left mb-5 mb-md-0 pos-value pos-value-last`}
          >
            <div className={`project-image`}>
              <img
                src={project3Image.sourceUrl}
                alt={project3Image.altText}
                className={`w-100`}
              />
              <Link to={project3Link} className={`inv-secondary-btn`}>
                Learn More
              </Link>
            </div>
          </div>
          <div className={`col-12 col-md-6 right mb-5 mb-md-0 pos-last`}>
            <div className={`project-details`}>
              <h5 className={`h5-text`}>{project3Title}</h5>
              {ReactHtmlParser(project3Description)}
              <span>{project3Technology}</span>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-12 our-work-btn`}>
            <Link to={`/our-work/`} className={`inv-primary-btn mx-auto`}>
              View More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurWork
