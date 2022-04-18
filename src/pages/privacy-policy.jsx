import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'

import Seo from '../components/seo'

const PrivacyPolicy = () => {
  const { wpgraphql } = useStaticQuery(
      graphql`
        query {
          wpgraphql {
            page(id: "cG9zdDoz", idType: ID) {
              title(format: RENDERED)
              content(format: RENDERED)
            }
          }
        }
      `
    ),
    { title, content } = wpgraphql.page
  return (
    <>
      <Seo
        title={title}
        description={`This privacy policy describes how the personally identifiable information you may provide on the innovagesoftwares.com website and any of its related products and services is collected, protected and used.`}
      />
      <section className={`additional-pages`}>
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div className={`col-12`}>
              <div className={`terms-policy`}>{ReactHtmlParser(content)}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy
