import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const AboutBanner = ({ data, title }) => {
  const { bannerDescription, bannerImage } = data
  return (
    <>
      <section
        className={`banner d-flex justify-content-center align-items-center`}
        style={{
          backgroundImage: `url(${bannerImage.imageFile.childImageSharp.original.src})`,
        }}
      >
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div className={`col-12`}>
              <div className={`banner-content text-center`}>
                <h1 className={`h1-text`}>{title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`entry-desc`}>
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div className={`col-12`}>{ReactHtmlParser(bannerDescription)}</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutBanner
