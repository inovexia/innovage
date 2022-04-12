import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const Services = ({ data }) => {
  const { serviceEntryTitle, services } = data

  return (
    <section className={`services`}>
      <div className={`container-fluid`}>
        <div className={`row entry-title`}>
          <div className={`col-12`}>
            <h3 className={`h3-text text-uppercase`}>{serviceEntryTitle}</h3>
          </div>
        </div>
        <div className={`service-list`}>
          {services &&
            services.map(
              ({ serviceTitle, serviceDescription, serviceImage }, index) => {
                return (
                  <div className={`row`} key={index}>
                    <div className={`col-12 col-md-6 service-first`}>
                      <div className={`service-image`}>
                        <img
                          src={serviceImage.sourceUrl}
                          alt={serviceImage.altText}
                          className={`w-100`}
                        />
                      </div>
                    </div>
                    <div className={`col-12 col-md-6 service-last`}>
                      <div className={`service-content`}>
                        <div className={`service-title`}>
                          {ReactHtmlParser(serviceTitle)}
                        </div>
                        <div className={`service-desc`}>
                          {ReactHtmlParser(serviceDescription)}
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
export default Services
