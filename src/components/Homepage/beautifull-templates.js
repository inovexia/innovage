import React from 'react'
import { Link } from 'gatsby'

const BeautifullTemplates = ({ data }) => {
  const {
    templateSectionTitle,
    keyFeatures,
    templateSectionImage,
    templateViewMoreButtonText,
    templateViewMoreLink,
  } = data
  return (
    <section className={`templates`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12 col-md-6 left order-2 order-md-1 `}>
            <div className={`template-left`}>
              <h3>{templateSectionTitle}</h3>
              <ul>
                {keyFeatures &&
                  keyFeatures.map(({ features }, index) => {
                    return (
                      <li className={`key-features`} ley={index}>
                        {features}
                      </li>
                    )
                  })}
              </ul>
              <Link className={`inv-primary-btn`} to={templateViewMoreLink}>
                {templateViewMoreButtonText}
              </Link>
            </div>
          </div>
          <div className={`col-12 col-md-6 order-1 order-md-2 `}>
            <div className={`template-right`}>
              <img
                src={templateSectionImage.sourceUrl}
                alt={templateSectionImage.altText}
                className={`w-100`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeautifullTemplates
