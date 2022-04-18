import { graphql, useStaticQuery } from 'gatsby'
const BlogPageData = () => {
  const { bannerImage } = useStaticQuery(graphql`
    {
      bannerImage: file(relativePath: { eq: "blog-banner.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  return {
    seoData: {
      title: `Blogs`,
      description: `We develop fast headless websites and Apps.`,
    },
    banner: {
      bannerImage: bannerImage,
      bannerTitle: `Blogs`,
    },
  }
}

export default BlogPageData
