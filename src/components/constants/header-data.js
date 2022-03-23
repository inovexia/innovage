import { graphql, useStaticQuery } from 'gatsby'

const HeaderData = () => {
  const {
    siteLogo,
    allProducts,
    massage,
    megaDonuts,
    megaFragrant,
    megaBathBombs,
    megaEssentials,
    megaFigure,
    megaGift,
    megaTreat,
    megaSkinCare,
  } = useStaticQuery(graphql`
    {
      siteLogo: file(relativePath: { eq: "site-logo.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 60)
        }
      }
      allProducts: file(relativePath: { eq: "all-products.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      megaDonuts: file(relativePath: { eq: "mega-donuts.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497, height: 411)
        }
      }
      megaFragrant: file(relativePath: { eq: "fragrant.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      megaBathBombs: file(relativePath: { eq: "bath-bombs.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      megaEssentials: file(relativePath: { eq: "essentials.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      megaFigure: file(relativePath: { eq: "figure.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      massage: file(relativePath: { eq: "massage.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      megaGift: file(relativePath: { eq: "gift.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      megaTreat: file(relativePath: { eq: "treat.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
      megaSkinCare: file(relativePath: { eq: "skincare.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 497)
        }
      }
    }
  `)

  return {
    topHeader: {
      flexList: [
        `Free delivery in GTA over $45`,
        `Curbside pick-up available`,
        `Shipping all over Canada & the US`,
      ],
    },
    mainHeader: {
      siteHome: `/`,
      siteLogo,
      navigation: {
        leftNav: [
          {
            type: `item`,
            link: `/all-products/`,
            label: `Products`,
          },
          {
            type: `item`,
            link: `/blog/`,
            label: `Blog`,
          },
          {
            type: `item`,
            link: `/about-us/`,
            label: `About Us`,
          },
          {
            type: `item`,
            link: `/contact/`,
            label: `Contact`,
          },

        ],
      },
      myAccountLabel: `Account`,
      cartLabel: `Cart`,
      megaMenuData: [
        {
          link: `/all-products/`,
          label: `ALL PRODUCTS`,
          image: allProducts,
        },
        {
          link: `/collections/essentials/`,
          label: `Essentials`,
          image: megaEssentials,
        },
        {
          link: `/collections/donut/`,
          label: `Donuts`,
          image: megaDonuts,
        },
        {
          link: `/collections/bath-bomb/`,
          label: `Bath Bombs`,
          image: megaBathBombs,
        },
        {
          link: `/collections/treat/`,
          label: `Treats`,
          image: megaTreat,
        },
        {
          link: `/collections/fragrant/`,
          label: `Fragrant`,
          image: megaFragrant,
        },
        {
          link: `/collections/figure/`,
          label: `Figure`,
          image: megaFigure,
        },
        {
          link: `/collections/skincare/`,
          label: `Skincare`,
          image: megaSkinCare,
        },
        {
          link: `/collections/massage/`,
          label: `Massage`,
          image: massage,
        },
        {
          link: `/collections/gift/`,
          label: `Gifts`,
          image: megaGift,
        },
      ],
    },
  }
}

export default HeaderData
