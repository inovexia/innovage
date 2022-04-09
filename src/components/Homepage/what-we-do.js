import React from 'react'

const WhatWeDo = ({ data }) => {
  const { whatWeDoTitle, whatWeDo } = data
  return (
    <section className={`what-we-do`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div className={`what-we-do-header`}>
              <h2 className={`h2-text`}>{whatWeDoTitle}</h2>
            </div>
          </div>
        </div>
        <div className={`row`}>
          {whatWeDo &&
            whatWeDo.map(({ description, title, iconImage }, index) => {
              return (
                <div
                  className={`col-12 col-md-6 col-lg-3 mb-4 mb-lg-0`}
                  key={index}
                >
                  <div className={`card-box text-center text-lg-start`}>
                    <div className={`icon`}>
                      <img
                        src={iconImage.sourceUrl}
                        alt={iconImage.altText}
                        width="40px"
                        height="auto"
                      />
                    </div>
                    <h5 className={`h5-text`}>{title}</h5>
                    <p>{description}</p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo
