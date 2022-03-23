import { graphql, useStaticQuery } from 'gatsby'
const PrivacyPolicyData = () => {
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
      title: `Privacy Policy`,
      description: `Privacy Policy Page.`,
    },
  }
}

export default PrivacyPolicyData
