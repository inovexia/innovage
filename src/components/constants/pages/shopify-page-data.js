import { graphql, useStaticQuery } from 'gatsby'

const ShopifyPageData = () => {
  const { openGraph } = useStaticQuery(graphql`
      {
        openGraph: file(relativePath: { eq: "og-image.jpg" }) {
          childImageSharp {
            gatsbyImageData(formats: AUTO, width: 1935, height: 1209)
          }
        }
      }
    `),
    ogImage = `https://mattressville.netlify.app${openGraph.childImageSharp.gatsbyImageData.images.fallback.src}`

  return {
    seoData: {
      title: `Theme Page`,
      description: `Storyblok is headless CMS. Know more about this Call us!`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Product Category',
        image: ogImage,
        '@id': '',
        url: 'https://storyblok-gatsby.netlify.app',
        telephone: '1234567890',
        priceRange: '$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1911 Dundas St. East, Unit 18',
          addressLocality: 'Mississauga',
          addressRegion: 'ON',
          postalCode: 'L4X 1M1',
          addressCountry: 'CA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.6209,
          longitude: -79.572548,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '11:00',
          closes: '18:00',
        },
        sameAs: [
          'https://www.facebook.com/storyblok',
          'https://twitter.com/storyblok',
          'https://www.instagram.com/storyblok',
        ],
      },
    },
  }
}

export default ShopifyPageData
