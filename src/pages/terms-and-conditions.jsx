import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ReactHtmlParser from 'react-html-parser'

import Seo from '../components/seo'

const TermsAndConditions = () => {
  const { wpgraphql } = useStaticQuery(
      graphql`
        query {
          wpgraphql {
            page(id: "cG9zdDoyMjk=", idType: ID) {
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
        description={`These terms and conditions sets forth the general terms and conditions of your use of the innovagesoftwares.com website and any of its related products and services.`}
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

export default TermsAndConditions
