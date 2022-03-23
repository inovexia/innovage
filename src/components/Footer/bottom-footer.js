import * as React from "react"
import { Link } from "gatsby"
import { Container,Row, } from "react-bootstrap"
import FooterData from '~/components/constants/footer-data'

const BottomFooter = () => {
  const { bottomFooter, paymentMethod, socialLink } = FooterData()
  return (
    <>
       
    <div className={`top-header`}>
        <Container>
            <Row>
                <div className={`col-12`}>
                    <ul className={`footer-menu list-unstyled d-flex justify-content-center m-0 py-5`}>
                   
                        {paymentMethod.map(({ image }, index) => {
                            return (
                            <li className={`mx-2`} key={index}>
                                <img
                                    loading={'lazy'}
                                    src={
                                        image.childImageSharp.gatsbyImageData.images
                                        .fallback.src
                                    }
                                    alt={'Logo'}
                                    height={
                                        image.childImageSharp.gatsbyImageData.height
                                    }
                                    width={
                                        image.childImageSharp.gatsbyImageData.width
                                    }
                                    className={`mb-0`}
                                    />
                            </li>
                            )
                        })}
                        
                    </ul>
                </div>
            </Row>
            <Row>
                <div className={`col-12 col-md-6`}>
                    <p className={`m-0 d-flex align-items-center justify-content-center justify-content-md-start h-100 text-white`}>{bottomFooter.copyRight}</p>
                </div>
                <div className={`col-12 col-md-6 mt-3 mt-md-0`}>
                    <ul className={`footer-menu list-unstyled d-flex justify-content-center justify-content-md-end m-0`}>
                    
                        {socialLink.map(({ link, socialIcon }, index) => {
                            return (
                            <li className={`mx-2 my-0`}>
                                    <Link to={link} key={index} style={{color: `white`, textDecoration: `none`,}}>
                                    <img
                                    loading={'lazy'}
                                    src={
                                        socialIcon.childImageSharp.gatsbyImageData.images
                                        .fallback.src
                                    }
                                    alt={'Logo'}
                                    height={
                                        socialIcon.childImageSharp.gatsbyImageData.height
                                    }
                                    width={
                                        socialIcon.childImageSharp.gatsbyImageData.width
                                    }
                                    className={`mb-0`}
                                    />
                                </Link>
                            </li>
                            )
                        })}
                        
                    </ul>
                </div>
            </Row>
        </Container>
    </div>
    </>
  )
 
        }


export default BottomFooter
