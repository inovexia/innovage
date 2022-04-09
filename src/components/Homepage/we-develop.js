import React from 'react'
import { Link } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'

const WeDevelop = ({ data }) => {
  const {
    weDevelopTitle,
    weDevelopDescription,
    weDevelopButtonText,
    weDevelopButtonLink,
  } = data
  return (
    <section className={`we-develop`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12 col-md-6`}>
            <div className={`we-develop-left`}>
              <h3 className={`h3-text`}>{weDevelopTitle}</h3>
            </div>
          </div>
          <div className={`col-12 col-md-6`}>
            <div className={`we-develop-right`}>
              {ReactHtmlParser(weDevelopDescription)}
              <Link to={weDevelopButtonLink} className={`inv-primary-btn`}>
                {weDevelopButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeDevelop
