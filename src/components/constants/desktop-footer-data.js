import { graphql, useStaticQuery } from 'gatsby'

const FooterData = () => {
  const { visa, masterCard, payPal } = useStaticQuery(graphql`
    {
      visa: file(relativePath: { eq: "visa.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 60, height: 38)
        }
      }
      masterCard: file(relativePath: { eq: "master-card.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 60, height: 38)
        }
      }
      payPal: file(relativePath: { eq: "pay-pal.png" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO, width: 60, height: 38)
        }
      }
    }
  `)

  return {
    topFooter: {
      about: {
        title: `About Us`,
        desc: `<p>Mattressville is a top quality bedding products retailer aiming to provide you the premium sleeping experience with our wide array of mattresses at a price that is easy on your pocket.</p>`,

        contact: `Contact Us`,
        address: `1911 Dundas St. East, Unit 18 Mississauga, On L4X 1M1`,
        phone: `905-212-7722`,
        mail: `info@mattressville.ca`,
      },
      brands: {
        title: `Brands`,
        brandType: [
          { link: `/all-mattresses/sealy/`, label: `Sealy` },
          { link: `/all-mattresses/beautyrest/`, label: `Beautyrest` },
          { link: `/all-mattresses/serta-icomfort/`, label: `Serta iComfort` },
          { link: `/all-mattresses/tempur-pedic/`, label: `Tempur-Pedic` },
          {
            link: `/all-mattresses/stearns-and-foster/`,
            label: `Stearns & Foster`,
          },
          { link: `/all-mattresses/kingsdown/`, label: `Kingsdown` },
          { link: `/all-mattresses/galaxy-bedding/`, label: `Galaxy Bedding` },
        ],
      },
      stylesTypes: {
        title: `Styles/Types`,
        styleType: [
          { link: `/all-mattresses/memory-foam/`, label: `Memory Foam` },
          { link: `/all-mattresses/pocket-coil/`, label: `Pocket Coil` },
          { link: `/all-mattresses/hybrid/`, label: `Hybrid` },
          {
            link: `/all-mattresses/pillow-top-euro-top/`,
            label: `Pillow Top/Euro Top`,
          },
          {
            link: `/all-mattresses/organic-latex/`,
            label: `Organic Latex`,
          },
          { link: `/all-mattresses/tight-top/`, label: `Tight Top` },
          {
            link: `/all-mattresses/continuous-coil/`,
            label: `Continuous Coil`,
          },
          {
            link: `/all-mattresses/mattress-in-a-box/`,
            label: `Mattress In A Box`,
          },
          {
            link: `/all-mattresses/foam/`,
            label: `Foam`,
          },
        ],
      },
      location: {
        title: `Delivery Areas`,
        areas: [
          [
            { link: `/brampton/`, label: `Brampton` },
            { link: `/burlington/`, label: `Burlington` },
            { link: `/georgetown/`, label: `Georgetown` },
            { link: `/hamilton/`, label: `Hamilton` },
            { link: `/markham/`, label: `Markham` },
            { link: `/mississauga/`, label: `Mississauga` },
            { link: `/oakville/`, label: `Oakville` },
            { link: `/pickering/`, label: `Pickering` },
          ],
          [
            { link: `/richmond-hill/`, label: `Richmond Hill` },
            { link: `/scarborough/`, label: `Scarborough` },
            { link: `/toronto/`, label: `Toronto` },
            { link: `/vaughan/`, label: `Vaughan` },
          ],
        ],
      },
      paySafe: {
        title: `Online Secure Payment`,
        visa,
        masterCard,
        payPal,
      },
    },
    bottomFooter: {
      menu: [
        {
          link: `/privacy-notice/`,
          label: `Privacy Notice`,
        },
        {
          link: `/terms-and-conditions/`,
          label: `Terms & Conditions`,
        },
        {
          link: `/refund-policy/`,
          label: `Refund Policy`,
        },
        {
          link: `/price-match-guarantee/`,
          label: `Price Match Guarantee`,
        },
        {
          link: `/60-days-comfort-guarantee/`,
          label: `60 Days Comfort Guarantee`,
        },
      ],
      copyright: `© 2021 Demosoap All rights reserved.`,
      socialMedia: [
        {
          link: `https://twitter.com/demosoap`,
          icon: `gs-twitter-alt`,
        },
        {
          link: `https://www.facebook.com/Demo-Soap-184227641589990`,
          icon: `gs-facebook-alt`,
        },
        {
          link: `https://www.instagram.com/demosoap`,
          icon: `gs-instagram`,
        },
      ],
    },
  }
}

export default FooterData
