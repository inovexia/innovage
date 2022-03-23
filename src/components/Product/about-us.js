import React from 'react'
import ReactHtmlParser from 'html-react-parser'

const AboutUs = ({
  title = `About Us`,
  description = `<p><strong>We are 100% Handmade in Toronto, Canada.</strong> We are proud to be doing what we love since 2004. We make everything ourselves in small batches in our Liberty Village studio. We focus on using the highest quality ingredients</p>`,
}) => {
  return (
    <div className={'about-us'}>
      <h5 className={'title'}>{title}</h5>
      <div className={'description'}>{ReactHtmlParser(description)}</div>
    </div>
  )
}
export default AboutUs
