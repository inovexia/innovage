import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const AboutUs = ({ data }) => {
  const { aboutDetails } = data
  return (
    <section className={`about-us`}>
      <div className={`container-fluid`}>
        <div className={`about-list`}>
          {aboutDetails &&
            aboutDetails.map(
              ({ aboutTitle, aboutDescription, aboutImage }, index) => {
                return (
                  <div className={`about-us-list`} key={index}>
                    <div class="row entry-title">
                      <div class="col-12">
                        <h3 class="h3-text text-uppercase">{aboutTitle}</h3>
                      </div>
                    </div>
                    <div className={`row double-column`}>
                      <div className={`col-12 col-md-6 about-first`}>
                        <div className={`about-image`}>
                          <img
                            src={
                              aboutImage.imageFile.childImageSharp.original.src
                            }
                            alt={aboutImage.altText}
                            className={`w-100`}
                            loading="lazy"
                            format="webp"
                          />
                        </div>
                      </div>
                      <div className={`col-12 col-md-6 about-last`}>
                        <div className={`about-content`}>
                          <div className={`about-header align-top`}>
                            <div className={`about-desc`}>
                              {ReactHtmlParser(aboutDescription)}
                            </div>
                          </div>
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

export default AboutUs
