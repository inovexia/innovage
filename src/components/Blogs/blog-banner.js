import React from 'react'
import BlogPageData from '~/components/constants/pages/blogs-page-data'

const BlogData = () => {
  const { banner } = BlogPageData()
  const { bannerImage } = banner
  return (
    <section
      className={`banner d-flex justify-content-center align-items-center`}
      style={{
        backgroundImage: `url(${bannerImage.childImageSharp.gatsbyImageData.images.fallback.src})`,
      }}
    >
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div className={`banner-content text-center`}>
              <h1 className={`h1-text`}>{banner.bannerTitle}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogData
