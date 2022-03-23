import React from "react"
import { graphql } from "gatsby"
import useStoryblok from "~/lib/storyblok"
import {Container} from "react-bootstrap"

const HomeBanner = ({
  banner_title,
  banner_subtitle,
  banner_image,
  banner_btn_link,
  banner_btn_text
}) => {
  return (
    <section className={`home-banner`}>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${banner_image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={`overlay h-100 position-absolute`}>
          <Container className={`h-100`}>
            <div className={`row h-100`}>
              <div className={`banner-content`}>
                <h2>{banner_title}</h2>
                <p>{banner_subtitle}</p>
                <a href={banner_btn_link}>{banner_btn_text}</a>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
