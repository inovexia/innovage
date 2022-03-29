import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import {Container} from "react-bootstrap"
import {Link } from "gatsby"
//import { StaticImage } from 'gatsby-plugin-image'

const CollectionsSlider = ({data}) => {
  return (
  <section className={`py-5`}>
    
    <Container>
      <div className={`row`}>
        <div className={`col-12`}>
          <h3>Our Collections</h3>
        </div>
      </div>
      <div className={`collection-slider`}>
      
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.collections && data.collections.edges.map(({ node}, index) => {
    return(
      <SwiperSlide kay={index}>
      <div class="card">
        <div className="product-image2"> 
            <Link to={`collections/${node.handle}`}> 
            <img
                src={node.image.originalSrc}
              alt="image"
              style={{width:'100%', height:'auto'}}
              />
            </Link>
        </div>
        <div className="product-content">
            <h4 className="title py-3 text-center"><Link className={`text-decoration-none text-dark`} to={`collections/${node.handle}`}>{node.title}</Link></h4>
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

export default CollectionsSlider

