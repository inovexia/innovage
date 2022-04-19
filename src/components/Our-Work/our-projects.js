import React from 'react'
import { Link } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'

const OurProjects = ({ data }) => {
  const { projectEntryTitle, projects } = data
  return (
    <section className={`projects`}>
      <div className={`container-fluid`}>
        <div className={`row entry-title`}>
          <div className={`col-12`}>
            <h3 className={`h3-text text-uppercase`}>{projectEntryTitle}</h3>
          </div>
        </div>
        <div className={`project-list`}>
          {projects &&
            projects.map(
              (
                {
                  projectName,
                  projectDescription,
                  projectLink,
                  buttonText,
                  projectImage,
                },
                index
              ) => {
                return (
                  <div className={`row`} key={index}>
                    <div className={`col-12 col-md-6 project-first`}>
                      <div className={`project-image`}>
                        <img
                          loading="lazy"
                          src={projectImage.sourceUrl}
                          alt={projectImage.altText}
                          className={`w-100`}
                        />
                      </div>
                    </div>
                    <div className={`col-12 col-md-6 project-last`}>
                      <div className={`project-content`}>
                        <div className={`project-header align-top`}>
                          <div className={`project-title`}>
                            {ReactHtmlParser(projectName)}
                          </div>
                          <div className={`project-desc`}>
                            {ReactHtmlParser(projectDescription)}
                          </div>
                        </div>

                        <div
                          className={`project-link d-flex align-items-end mt-3 mt-md-0`}
                        >
                          <Link to={projectLink} className={`inv-primary-btn`}>
                            {buttonText}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            )}
        </div>
      </div>
    </section>
  )
}

export default OurProjects
