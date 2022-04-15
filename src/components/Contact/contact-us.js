import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const Contact = ({ data }) => {
  const { addressLine1, addressLine2, contactDetails } = data
  return (
    <section className={`contact-us`}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          <div className={`col-12`}>
            <div className={`contact-details`}>
              <ul>
                <li>{ReactHtmlParser(addressLine1)}</li>
                <li>{ReactHtmlParser(addressLine2)}</li>
                <li>{ReactHtmlParser(contactDetails)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Contact
