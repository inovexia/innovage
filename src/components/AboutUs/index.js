import React from 'react'
import { render } from 'storyblok-rich-text-react-renderer'

const AboutUs = ({ data }) => {
  return (
    <>
      <section
        className={'about-us-banner'}
        style={{
          backgroundImage: `url(${data.about_banner_image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={`bg-layer`}></div>
        <div className={`container-fluid h-100`}>
          <div className={`row h-100`}>
            <div className={`col-12 banner-content-outer`}>
              <div className={`about-banner-content`}>
                <h1>{data.page_title}</h1>
                {/* <h2>{data.about_banner_title}</h2> */}
                {data.about_banner_subtitle && data.about_banner_subtitle ? (
                  <p>{render(data.about_banner_subtitle)}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`why-choose-us py-5`}>
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div className={`col-12 col-md-6`}>
              <div className={`why-choose-left pe-0 pe-md-5`}>
                <h3>{data.why_choose_us_title}</h3>
                {data.why_choose_us_description &&
                data.why_choose_us_description ? (
                  <p>{render(data.why_choose_us_description)}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div
              className={`col-12 col-md-6 why-choose-left-image`}
              style={{
                backgroundImage: `url(${data.why_choose_us_image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          </div>
        </div>
      </section>
      <section className={`our-services py-5`}>
            <div className={`container-fluid`}>
              <div className={`row`}>
                <div className={`col-12`}>
                  <div className={`services-entry-header`}>
                  <h3>{data.our_services_title}</h3>
                  {data.our_services_description ? <p>{data.our_services_description}</p> : ''}
                  </div>
                </div>
              </div>
              <div className={`row`}>
                <div className={`col-12 col-md-4 mb-3 mb-md-0`}>
                  <div className={`our-service-card`}>
                    <div className={`service-icon`}>
                      <img src={data.service1_icon} alt={data.service1_title}/>
                    </div>
                    <div classname={`service-body`}>
                      <h3>{data.service1_title}</h3>
                      {data.service1_description ? <p>{data.service1_description}</p> : ''}
                    </div>
                  </div>
                </div>
                <div className={`col-12 col-md-4 mb-3 mb-md-0`}>
                <div className={`our-service-card`}>
                    <div className={`service-icon`}>
                      <img src={data.service2_icon} alt={data.service2_title}/>
                    </div>
                    <div classname={`service-body`}>
                      <h3>{data.service2_title}</h3>
                      {data.service2_description ? <p>{data.service2_description}</p> : ''}
                    </div>
                  </div>
                </div>
                <div className={`col-12 col-md-4 mb-3 mb-md-0`}>
                <div className={`our-service-card`}>
                    <div className={`service-icon`}>
                      <img src={data.service3_icon} alt={data.service3_title}/>
                    </div>
                    <div classname={`service-body`}>
                      <h3>{data.service3_title}</h3>
                      {data.service3_description ? <p>{data.service3_description}</p> : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </section>
    </>
  )
}

export default AboutUs
