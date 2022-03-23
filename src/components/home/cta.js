
    import * as React from "react"
    import {Container} from "react-bootstrap"
    
    const CTA = ({blok})=>(
        <section className={`cta-section py-5`} style={{backgroundColor:' #C70039 '}}>
        <div className="about-section">
              
              <Container className={`h-100`}>
              <div className="row justify-content-center text-center">
      <div className="col-md-9 col-12">

        <h2 className="display-4 text-white">Hurry. Grab yourself a deal to be proud of with this limited time offer</h2>
        <p className="lead text-white px-lg-12 mb-6">Another combination of pride in finding a great deal mixed with urgency.</p>
    
        <div className="d-grid d-md-block">
          <a href="tel:1234567890" className="btn btn-primary mb-2 mb-md-0">For any query CALL US</a>
        </div>
      </div>
    </div>
    
                
            </Container>
        
            
        </div>
        </section>
    )
    
    export default CTA