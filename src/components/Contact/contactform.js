import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Alert } from 'react-bootstrap'

const Contactform = ({ data }) => {
  const { addressLine1, addressLine2, contactDetails, contactFormTitle } = data
  const [invalidFields, setInvalidFields] = useState(null)
  const [responseColor, setResponseColor] = useState('')
  const [responseContent, setResponseContent] = useState(false)
  const [responseVisible, setResponseVisible] = useState(false)
  const [responseErrorVisible, setResponseErrorVisible] = useState(false)

  const dismissResponse = () => {
    setResponseVisible(false)
    setResponseContent(false)
  }
  const dismissErrorResponse = () => {
    setResponseErrorVisible(false)
    setResponseContent(false)
  }
  const response = (
    <Alert
      className="rounded-0"
      isOpen={responseVisible}
      toggle={dismissResponse}
      color={responseColor}
    >
      {responseContent}
    </Alert>
  )
  const response_Error = (
    <Alert
      className="rounded-0"
      isOpen={responseErrorVisible}
      toggle={dismissErrorResponse}
      color={responseColor}
    >
      {responseContent}
    </Alert>
  )
  const sendFormData = async (URL, fromEle, fromData) => {
    fetch(URL, {
      method: 'POST',
      body: fromData,
    })
      .then(response => {
        response.json().then(responseJson => {
          setResponseContent(responseJson.message)
          if (responseJson.status === 'validation_failed') {
            setResponseColor('warning')
            if (responseJson.invalid_fields !== null) {
              setInvalidFields(responseJson.invalid_fields)
              responseJson.invalid_fields.forEach(Field => {
                document
                  .getElementById(Field.into.split('.').pop())
                  .classList.add('border-danger')
                document
                  .getElementById(Field.into.split('.').pop())
                  .setAttribute('title', Field.message)
              })
            }
          }
          if (responseJson.status === 'mail_sent') {
            setResponseColor('success')
            fromEle.reset()
          }
          setResponseVisible(true)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  const formSubmit = event => {
    event.preventDefault()
    dismissResponse()
    dismissErrorResponse()
    if (invalidFields !== null) {
      invalidFields.forEach(Field => {
        document
          .getElementById(Field.into.split('.').pop())
          .classList.remove('border-danger')
        document
          .getElementById(Field.into.split('.').pop())
          .removeAttribute('title')
      })
    }
    const wpUrl =
      'https://appsandprojects.com/wp-gatsby/innovage-gatsby-website'
    const formId = 220
    const apiPath = `${wpUrl
      .split(':')
      .pop()}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback/`
    const fromEle = event.target
    const fromData = new FormData(event.target)
    sendFormData(apiPath, fromEle, fromData)
  }
  return (
    <section className="contact-form-section">
      <div className="container-fluid">
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
        <div className="row">
          <div className={`col-12`}>
            <div className={`form-header`}>
              <h2>{contactFormTitle}</h2>
            </div>
          </div>
        </div>
        <div className={`row`}>
          <div className={`form-pos`}>
            <div className="h-100">
              <form
                id="contact-form"
                method="post"
                encType="multipart/form-data"
                onSubmit={e => formSubmit(e)}
              >
                <div>
                  <div id="success-contact-form" className="mx-0"></div>
                  <div className={`row`}>
                    <div className={`col-12 col-md-6`}>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder="Full Name*"
                        className="w-100"
                      />
                    </div>
                    <div className={`col-12 col-md-6`}>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="E-mail*"
                        className="w-100"
                      />
                    </div>
                  </div>
                  <div className={`row`}>
                    <div className={`col-12 col-md-6`}>
                      <input
                        type="text"
                        name="tel-629"
                        id="tel-629"
                        placeholder="Phone Number"
                        className="w-100"
                      />
                    </div>
                    <div className={`col-12 col-md-6`}>
                      <input
                        type="text"
                        name="website-type"
                        id="website-type"
                        placeholder="Website Type Eg: Simple Ecommerce"
                        className="w-100"
                      />
                    </div>
                  </div>
                  <div className={`row`}>
                    <div className={`col-12`}>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        className="w-100"
                      />
                    </div>
                    <div className={`col-12`}>
                      <textarea
                        name="comment"
                        id="comment"
                        placeholder="Your Message"
                        rows="5"
                        className="w-100"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    id="contact-us-button"
                    type="submit"
                    className="inv-primary-btn"
                  >
                    SUBMIT
                  </button>
                </div>
                <div className="response">
                  {response_Error & (response_Error !== '')
                    ? response_Error
                    : response}
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-lg-6 last-paragraph-no-margin">
            <div className="padding-ten-all bg-light-gray border-radius-6 lg-padding-seven-all sm-padding-30px-all h-100 text-center text-lg-left"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Contactform
