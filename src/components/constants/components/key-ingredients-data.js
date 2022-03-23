import { graphql, useStaticQuery } from 'gatsby'

const KeyIngredientsData = () => {
  return useStaticQuery(graphql`
    {
      essential_oil: file(relativePath: { eq: "essential_oil.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 36)
        }
      }
      jojoba_oil: file(relativePath: { eq: "jojoba_oil.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 22)
        }
      }
      glycerin: file(relativePath: { eq: "glycerin.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 85)
        }
      }
    }
  `)
}

export default KeyIngredientsData
