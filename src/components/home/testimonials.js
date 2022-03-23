import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



// import required modules
import { Pagination } from "swiper";
        
  
    import {Container} from "react-bootstrap"
    import { graphql, Link } from "gatsby"
    
    const Testimonials = ({blok}) => (

        <>
      
      <section className={`testimonials py-5`}>
        <div className="about-section">
              
              <Container className={`h-100`}>
                <div className={`row`}>
                  <div className={`col-12 text-center`}>
                    <h3 className={`w-100 text-center pb-3`}>What our customers say</h3>
                  </div>  
                </div>
              <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
        <div class="card">
                    <div class="img-card"> <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/> </div>
                    <div className={`p-3`}>
                    <div class="testimonial mt-4 mb-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque odit saepe quo natus aut accusantium alias blanditiis. </div>
                    <div class="name"> Denis Richie </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div class="card">
                    <div class="img-card"> <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/> </div>
                    <div className={`p-3`}>
                    <div class="testimonial mt-4 mb-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque odit saepe quo natus aut accusantium alias blanditiis. </div>
                    <div class="name"> Denis Richie </div>
                    </div>
                    
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div class="card">
                    <div class="img-card"> <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/> </div>
                    <div className={`p-3`}>
                    <div class="testimonial mt-4 mb-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque odit saepe quo natus aut accusantium alias blanditiis. </div>
                    <div class="name"> Denis Richie </div>
                    </div>
                    
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div class="card">
                    <div class="img-card"> <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/> </div>
                    <div className={`p-3`}>
                    <div class="testimonial mt-4 mb-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque odit saepe quo natus aut accusantium alias blanditiis. </div>
                    <div class="name"> Denis Richie </div>
                    </div>
                    
                </div>
        </SwiperSlide>
      </Swiper>
            </Container> 
        </div>
        </section>
        </>
        
    )
    
    export default Testimonials