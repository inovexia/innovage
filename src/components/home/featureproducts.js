import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import {Container} from "react-bootstrap"
import { graphql, Link } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'

const FeaturedProducts = ({data}) => {
  return (
  <section className={`py-5`}>
    
    <Container>
      <div className={`row`}>
        <div className={`col-12`}>
          <h3>Featured Products</h3>
        </div>
      </div>
      <div className={`collection-slider`}>
      
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.products && data.products.edges.map(({ node}, index) => {
    return(
      <SwiperSlide kay={index}>
      <div class="card">
        <div className="product-image2"> 
            <Link to={`product/${node.handle}`}> 
            <img
                src={node.featuredImage.originalSrc}
              alt="image"
              style={{width:'100%', height:'auto'}}
              />
            </Link>
        </div>
        <div className="product-content">
            <h4 className="title py-3 text-center"><Link className={`text-decoration-none text-dark`} to={`product/${node.handle}`}>{node.title}</Link></h4>
            <h5>
                <span>${node.priceRange.minVariantPrice.amount}</span>
            -
            <span>${node.priceRange.maxVariantPrice.amount}</span></h5>
        </div>
      </div>
    </SwiperSlide>
     )
    
  })}
         
        </Swiper>
      </div>
    </Container>
  </section>
  )
}

export default FeaturedProducts

