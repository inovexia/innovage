import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const OurProcess = ({ data }) => {
  const { processEntryTitle, ourProcess } = data
  return (
    <section className={`our-process`}>
      <div className={`container-fluid`}>
        <div className={`row entry-title`}>
          <div className={`col-12`}>
            <h3 className={`h3-text text-uppercase`}>{processEntryTitle}</h3>
          </div>
        </div>
        <div className={`process`}>
          {ourProcess &&
            ourProcess.map(({ title, description, processImage }, index) => {
              return (
                <div className={`row`} key={index}>
                  <div className={`col-12 col-md-6 pos-rel order-2 order-md-1`}>
                    <div className={`process-content`}>
                      <h4 className={`h4-text`}>{title}</h4>
                      {ReactHtmlParser(description)}
                    </div>
                  </div>
                  <div
                    className={`col-12 col-md-6 order-1 order-md-2 pos-unset`}
                  >
                    <img
                      src={processImage.sourceUrl}
                      alt={processImage.alttext}
                      className={`w-100`}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default OurProcess
