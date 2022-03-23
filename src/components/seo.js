import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ description, lang, meta, title, ogImage, schemaMarkup }) => {
  const {
    site: { siteInfo },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteInfo: siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={`${title ? `${title} | ` : ''}${siteInfo.title}`}
      meta={[
        {
          name: `description`,
          content: description ? description : siteInfo.description,
        },
        {
          property: `og:title`,
          content: `${title ? `${title} | ` : ''}${siteInfo.title}`,
        },
        {
          property: `og:url`,
          content: siteInfo.siteUrl,
        },
        {
          property: `og:image`,
          content: ogImage
            ? `${siteInfo.siteUrl}${ogImage}`
            : `${siteInfo.siteUrl}/og-image.jpg`,
        },
        {
          property: `og:description`,
          content: description ? description : siteInfo.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteInfo.title,
        },
        {
          name: `twitter:image`,
          content: ogImage
            ? `${siteInfo.siteUrl}${ogImage}`
            : `${siteInfo.siteUrl}/og-image.jpg`,
        },
        {
          name: `twitter:site`,
          content: siteInfo.siteUrl,
        },
        {
          name: `twitter:title`,
          content: `${title ? `${title} | ` : ''}${siteInfo.title}`,
        },
        {
          name: `twitter:description`,
          content: description ? description : siteInfo.description,
        },
      ].concat(meta)}
    >
      {schemaMarkup && (
        <script type={'application/ld+json'}>
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
