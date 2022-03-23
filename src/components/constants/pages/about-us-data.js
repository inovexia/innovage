import { graphql, useStaticQuery } from 'gatsby'
const AboutUsData = () => {
  const {
    aboutImg1,
    aboutImg2,
    aboutImg3,
    aboutImg4,
    galleryImg1,
    galleryImg2,
    galleryImg3,
    galleryImg4,
  } = useStaticQuery(graphql`
    {
      aboutImg1: file(relativePath: { eq: "about1.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      aboutImg2: file(relativePath: { eq: "about2.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      aboutImg3: file(relativePath: { eq: "about3.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      aboutImg4: file(relativePath: { eq: "about4.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      galleryImg1: file(relativePath: { eq: "gallery1.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      galleryImg2: file(relativePath: { eq: "gallery2.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      galleryImg3: file(relativePath: { eq: "gallery3.jpg" }) {
        childImageSharp {
          gatsbyImageData(formats: AUTO)
        }
      }
      galleryImg4: file(relativePath: { eq: "gallery4.jpg" }) {
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
      title: `About Us`,
      description: `About Us Page.`,
    },
    mainData: {
      pageTitle: `About Us`,
      aboutUsTitle: `ABOUT US`,
      aboutUsDescription: `We at <strong>Demosoap</strong> have been handcrafting artisanal soaps for over 20 years with both love and care to benefit you and nature alike. And even after all these years, we've kept tradition and care for crafting while still improving designs and innovating to please every customer and meet every need.`,
      aboutUsImage: aboutImg1,
      aboutUsImageLg: aboutImg1,
      section2Image: aboutImg2,
      section2Description: `We're a <strong>small company from Liberty Village</strong>, bringing joy to countless customers for over two decades of hard work. Our focus is to provide you with the best soaps made from <strong>natural ingredients</strong> that benefit the environment and the skin to uplift your mood, health and bring smiles to everyone. It's the perfect combination, and everybody wins!`,
      section3Image: aboutImg3,
      section3Description: `We have a wide selection at both our physical and online stores, and we always make sure to have the best product for your needs. Be it a <strong>mood booster</strong>, an <strong>incredibly aromatic soap</strong>, or even a <strong>trusty companion for all your aromatherapy needs</strong>. You can pick all sorts of soaps that will aid you in several ways for the most friendly prices.`,
      section4Image: aboutImg4,
      section4Description: `<ul>
      <li>
      <strong>Amazing and unique scents</strong> to take your bath or shower to the next level!
      </li>
      <li>
      <strong>Health and care</strong> for the skin and mind! 
      </li>
      <li>
      <strong>Great gifts for family and friends</strong> with hand-drawn figures and shapes! 
      </li>
      <li>
      <strong>Environmental friendly</strong> to help our planet grow greener! 
      </li>
      <li>
      <strong>Don't keep waiting!</strong> Come browse our incredible selection and treat yourself or put a smile on someone close and dear with our amazing gifts!
      </li>
      </ul>`,
    },
    gallery: {
      sectionTitle: `GALLERY`,
      gallerySlider: [
        {
          image: galleryImg1,
        },
        {
          image: galleryImg2,
        },
        {
          image: galleryImg3,
        },
        {
          image: galleryImg4,
        },
        {
          image: galleryImg2,
        },
        {
          image: galleryImg1,
        },
        {
          image: galleryImg4,
        },
        {
          image: galleryImg3,
        },
      ],
    },
  }
}

export default AboutUsData
