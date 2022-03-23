import * as React from "react"
import {Container} from "react-bootstrap"

const AboutSection = ({about_title,about_subtitle,about_image, about_description,about_btn_text,about_btn_link})=>(
    <section className={`about-home py-5`}>
        
    <div className="about-section">
          
          <Container className={`h-100`}>
            <div className="row gx-0">

          <div className="col-lg-6 d-flex flex-column justify-content-center aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h3>{about_title}</h3>
              <h2>{about_subtitle}</h2>
              <p>
                Quisquam vel ut sint cum eos hic dolores aperiam. Sed deserunt et. Inventore et et dolor consequatur itaque ut voluptate sed et. Magnam nam ipsum tenetur suscipit voluptatum nam et est corrupti.
              </p>
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