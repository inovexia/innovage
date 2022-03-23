import { graphql, useStaticQuery } from 'gatsby'
const TermsConditionsData = () => {
  const {
   
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  return {
    seoData: {
      title: `Terms & Conditions`,
      description: `Terms & Conditions.`,
    },
  }
}

export default TermsConditionsData
