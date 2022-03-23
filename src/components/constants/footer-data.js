import { graphql, useStaticQuery } from 'gatsby'

const FooterData = () => {
  const { footerLogo, gPay, masterCard, payBright, payPal, shopPay, facebook, youtube, instagram, twitter} = useStaticQuery(graphql`
    {
      footerLogo: file(relativePath: { eq: "site-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 75
          )
        }
      }
      gPay: file(relativePath: { eq: "g-pay.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
      masterCard: file(relativePath: { eq: "master-card.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
      payBright: file(relativePath: { eq: "pay-bright.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
      payPal: file(relativePath: { eq: "pay-pal.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height: 50
          )
        }
      }
      shopPay: file(relativePath: { eq: "shop-pay.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
      facebook: file(relativePath: { eq: "facebook.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
      twitter: file(relativePath: { eq: "twitter.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
      instagram: file(relativePath: { eq: "instagram.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
      youtube: file(relativePath: { eq: "youtube.png" }) {
        childImageSharp {
          gatsbyImageData(
            formats: AUTO
            placeholder: DOMINANT_COLOR
            height:50
          )
        }
      }
    }
  `)

  return {
    topFooter: {
      footerLogo,
    },
    footerMenu: [
        {
            link: `/all-products`,
            label: `Products`,
        },
        {
            link: `/blog/`,
            label: `Blog`,
        },
        {
            link: `/terms-and-conditions/`,
            label: `Terms & Conditions`,
        },
        {
            link: `/privacy-policy/`,
            label: `Privacy Policy`,
        },
        {
            link: `/contact/`,
            label: `Contact`,
        },
        
      ],
      bottomFooter: {
        copyRight: `@ All Right Reserved 2022`,
      },
      paymentMethod:[
          {
              image: gPay,
          },
          {
              image: masterCard,
          },
          {
              image: payBright,
          },
          {
              image: payPal,
          },
          {
              image: shopPay,
          },
      ],
      socialLink: [
          {
              link:`#`,
              socialIcon: facebook,
          },
          {
            link:`#`,
            socialIcon: twitter,
        },
        {
            link:`#`,
            socialIcon: instagram,
        },
        {
            link:`#`,
            socialIcon: youtube,
        }
      ],
      
  }
}

export default FooterData
