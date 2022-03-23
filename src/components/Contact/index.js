import React, { useState } from 'react'
import ReactHtmlParser from 'html-react-parser'
import emailjs from 'emailjs-com'

const Contact = ({ data: { pageTitle, address, getInTouch } }) => {
  const [isSubmitting, updateSubmitting] = useState(false),
    [responseColor, setResponseColor] = useState(''),
    [message, setMessage] = useState(null),
    submitContactForm = e => {
      e.preventDefault()
      updateSubmitting(true)
      emailjs
        .sendForm(
          'service_12qhrr7',
          'template_d6n4w7q',
          e.target,
          'user_BV0axK6Y16BtLdONYEbaa'
        )
        .then(
          result => {
            if (result.text.toLowerCase() === 'ok') {
              setResponseColor('success')
              setMessage(<p>{'Email sent successfully.'}</p>)
              e.target.reset()
              //resetReCaptcha()
              updateSubmitting(false)
            }
          },
          error => {
            console.log(error.text)
          }
        )
    }

  return (
    <section className={'contact-us'}>
      <div className={'page-title'}>
        <h1>{pageTitle}</h1>
      </div>
      <div className={'container-fluid'}>
        <div className={'d-block d-lg-flex flex-row'}>
          <div className={'form-outer'}>
            <div className={'contact-form'}>
              <form onSubmit={submitContactForm}>
                <div className={'d-block d-lg-flex double-col'}>
                  <div className={'form-group'}>
                    <input
                      type={'text'}
                      id={'fname'}
                      name={'fname'}
                      size={'40'}
                      className={'form-control'}
                      required={true}
                      placeholder={'YOUR NAME'}
                    />
                  </div>
                  <div className={'form-group email-box'}>
                    <input
                      type={'email'}
                      name={'email'}
                      id={'email'}
                      size={'40'}
                      className={'form-control'}
                      required={true}
                      placeholder={'YOUR EMAIL ADDRESS'}
                    />
                  </div>
                </div>
                <div className={'single-col'}>
                  <div className={'form-group'}>
                    <textarea
                      name={'message'}
                      id={'message'}
                      className={'form-control'}
                      required={false}
                      rows={'4'}
                      placeholder={'YOUR MESSAGE'}
                    />
                  </div>
                </div>
                {message && (
                  <div
                    className={`alert alert-${responseColor} submit-response`}
                  >
                    {message}
                  </div>
                )}
                <div className={'form-submit'}>
                  <input
                    type={'submit'}
                    value={'SUBMIT'}
                    className={'btn-submit btn btn-demo-primary'}
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className={'address-outer'}>
            <div className={'address-box'}>
              <h5>{address.addressTitle}</h5>
              <p>{ReactHtmlParser(address.addressDetails)}</p>
            </div>
            <div className={'contact-by'}>
              <h5>{getInTouch.getInTouchTitle}</h5>
              <strong>
                <a href={`mailto:${getInTouch.email}`}>{getInTouch.email}</a>
              </strong>
              <p>
                <a href={`tel:${getInTouch.phone}`}>{getInTouch.phone}</a>
              </p>
              <span>{getInTouch.openingHours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
