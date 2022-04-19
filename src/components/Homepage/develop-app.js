import React from 'react'
import { Link } from 'gatsby'

const DevelopApp = ({ data }) => {
  const {
    developAppTitle,
    developApp,
    developButtonText,
    developButtonLink,
    appImage,
  } = data
  return (
    <section className={`develop-app`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12 col-md-6 `}>
            <div className={`template-right`}>
              <img
                loading="lazy"
                src={appImage.imageFile.childImageSharp.original.src}
                alt={appImage.altText}
                className={`w-100`}
              />
            </div>
          </div>
          <div className={`col-12 col-md-6 left mb-5 mb-md-0`}>
            <div className={`template-left`}>
              <h3>{developAppTitle}</h3>
              <ul>
                {developApp &&
                  developApp.map(({ app }, index) => {
                    return (
                      <li className={`key-features`} ley={index}>
                        {app}
                      </li>
                    )
                  })}
              </ul>
              <Link className={`inv-primary-btn`} to={developButtonLink}>
                {developButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DevelopApp
