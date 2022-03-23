import * as React from "react"
import {Container} from "react-bootstrap"
import {Link } from "gatsby"

const Collections = ({blok})=>(
    <section className={`homepage-collections py-5`}>
    
    <div className="collections">
          
          <Container className={`h-100`}>
            <div className={`row pb-3`}>
                 <div className={`col-6`}><h3>Our Collections</h3></div> 
            </div>
            <div className="row">
                <div className="col-md-4 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2"> 
                            <a href="#"> 
                                <img className="pic-2" src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1561643955/img1.2.jpg"/> 
                            </a>
                        </div>
                        <div className="product-content">
                            <h3 className="title"><a href="#">Women's Top</a></h3> <span className="price">Rs 400</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2"> 
                            <a href="#"> 
                                <img className="pic-2" src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1561643954/img-2.2.jpg"/> 
                            </a>
                        </div>
                        <div className="product-content">
                            <h3 className="title"><a href="#">Women's Top</a></h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div className="product-grid2">
                        <div className="product-image2"> 
                            <a href="#"> 
                                <img className="pic-2" src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1561643960/img-1.3.jpg"/> 
                            </a>
                        </div>
                        <div className="product-content">
                            <h3 className="title"><a href="#">Women's Top</a></h3>
                        </div>
                    </div>
                </div>
            </div>

            
        </Container>
    
        
    </div>
    </section>
)

export default Collections