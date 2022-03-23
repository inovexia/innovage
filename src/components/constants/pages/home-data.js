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
      description: `Handmade soaps with natural organic and ethical ingredients made in our Toronto workshop.`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Demosoap',
        image: `${site.siteMetadata.siteUrl}/og-image.jpg`,
        '@id': '',
        url: site.siteMetadata.siteUrl,
        telephone: '(416) 536-3916',
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
          'https://www.facebook.com/Demo-Soap-184227641589990',
          'https://twitter.com/demosoap',
          'http://instagram.com/demosoap',
        ],
      },
    },
    
   
  
    
  }
}

export default HomeData
