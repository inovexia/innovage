import { graphql, useStaticQuery } from 'gatsby'

const HomeData = () => {
  const {
    site,
   
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
    seo: {
      title: null,
      description: `Storyblok Gatsby Shopify Starter Theme.`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Starter Theme',
        image: `${site.siteMetadata.siteUrl}/og-image.jpg`,
        '@id': '',
        url: site.siteMetadata.siteUrl,
        telephone: '+91-1234567890',
        priceRange: '$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '171 E Liberty St, Unit #123,',
          addressLocality: 'Toronto',
          addressRegion: 'ON',
          postalCode: 'M6K 3P6',
          addressCountry: 'CA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.6382632,
          longitude: -79.4201758,
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
          opens: '12:00',
          closes: '18:00',
        },
        sameAs: [
          'https://www.facebook.com/starter-theme-184227641589990',
          'https://twitter.com/starter-theme',
          'http://instagram.com/starter-theme',
        ],
      },
    },
  }
}

export default HomeData
