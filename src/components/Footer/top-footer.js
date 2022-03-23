import * as React from "react"
import { Link } from "gatsby"
import { Container,Row, } from "react-bootstrap"
import FooterData from '~/components/constants/footer-data'

const TopFooter = () => {
  const { topFooter, footerMenu } = FooterData()

  return (
    <>
       
    <div className={`top-header border-bottom`}>
        <Container>
            <Row>
                <div className={`col-12`}>
                    <div className={`footer-logo text-center`}>
                    <Link to={'/'} className={`logo`}>
                        <img
                        loading={'lazy'}
                        src={
                            topFooter.footerLogo.childImageSharp.gatsbyImageData.images
                            .fallback.src
                        }
                        alt={'Logo'}
                        height={
                            topFooter.footerLogo.childImageSharp.gatsbyImageData.height
                        }
                        width={
                            topFooter.footerLogo.childImageSharp.gatsbyImageData.width
                        }
                        className={`mb-0`}
                        />
                    </Link>

                    </div>
                </div>
            </Row>
            <Row>
                <div className={`col-12`}>
                    <ul className={`footer-menu list-unstyled d-block d-md-flex justify-content-center m-0 py-5`}>
                   
                        {footerMenu.map(({ link, label }, index) => {
                            return (
                            <li className={`mx-2`}>
                                 <Link to={link} key={index} style={{color: `white`, textDecoration: `none`,}}>
                                {label}
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


export default TopFooter
