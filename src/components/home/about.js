import * as React from "react"
import {Container} from "react-bootstrap"
import { render } from 'storyblok-rich-text-react-renderer'

const AboutSection = ({about_title,about_subtitle,about_image, about_description,about_btn_text,about_btn_link})=>(
    <section className={`about-home py-5`}>
        
    <div className="about-section">
          
          <Container className={`h-100`}>
            <div className="row gx-0">

          <div className="col-lg-6 d-flex flex-column justify-content-center aos-init aos-animate pe-0 pe-md-4" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h3>{about_title}</h3>
              <h2>{about_subtitle}</h2>
              {about_description && about_description ? <p>{render(about_description)}</p> : ''}
              <div className="text-center text-lg-start">
                <a href={about_btn_link} className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                  <span>{about_btn_text}</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 d-flex align-items-center aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
            <img src={about_image} className="img-fluid" alt=""/>
          </div>

        </div>

            
        </Container>
    
        
    </div>
    </section>
)

export default AboutSection