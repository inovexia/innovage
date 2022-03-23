import React, { useState } from 'react'
import ReactHtmlParser from 'html-react-parser'
import emailjs from 'emailjs-com'
import ReCAPTCHA from 'react-google-recaptcha'

import GSIcon from '~/components/gs-icon'

const Contact = ({ data }) => {
  const subject = `New contact request from Contact Us form`,
    [isSubmitting, updateSubmitting] = useState(false),
    [isVerified, setVerified] = useState(false),
    [responseColor, setResponseColor] = useState(''),
    [message, setMessage] = useState(null),
    [reCaptchaInstance, setReCaptchaInstance] = useState(null),
    reCaptchaReference = event => {
      setReCaptchaInstance(event)
    },
    resetReCaptcha = () => {
      setVerified(false)
      reCaptchaInstance.reset()
    },
    verifyCaptcha = value => {
      if (value && value.length > 0) {
        setResponseColor('')
        setMessage(null)
        setVerified(true)
      }
    },
    expiredCaptcha = () => {
      setResponseColor('warning')
      setMessage(
        <p>
          <strong>Verification Expired!&nbsp;</strong>Check the Checkbox Again.
        </p>
      )
      setVerified(false)
    },
    submitContactForm = async event => {
      event.preventDefault()
      if (isVerified) {
        try {
          const formData = new FormData(event.target)
          formData.delete('g-recaptcha-response')
          const formBody = new URLSearchParams(formData).toString()
          updateSubmitting(true)
          const submittedForm = await fetch('./', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formBody,
          })
          if (submittedForm.ok) {
            setResponseColor('success')
            setMessage(<p>{'Email sent successfully.'}</p>)
          }
        } catch (error) {
          console.log(error.message)
        } finally {
          event.target.reset()
          resetReCaptcha()
          updateSubmitting(false)
        }
      } else {
        setResponseColor('warning')
        setMessage(
          <p>
            <strong>Verify!</strong> If you are not a bot.
          </p>
        )
      }
    }

  return (
    <section className={'contact-us pb-5'}>
      <div className={'container-fluid'}>
        <div className={'page-title'}>
          <h1>{data.title}</h1>
        </div>
      </div>
      <div className={'container-fluid'}>
        <div className={'d-block d-lg-flex flex-row'}>
        <div className={'address-outer'}>
            <div className={'address-box'}>
              <h5>ADDRESS</h5>
              <p>
              {data.address_line1 ? <strong>{data.address_line1}</strong> : 
               ''
              }
              {data.address_line2 && data.address_line2 ? <span class="d-block">{data.address_line2}</span> : 
               ''
              } 
              </p>
            </div>
            <div className={'contact-by'}>
              <h5>GET IN TOUCH</h5>
              <strong>
                {data.contact_email ? <a href={`mailto:${data.contact_email}`}>{data.contact_email}</a> : '' } 
              </strong>
              <p>
                {data.contact_number ? <a href={`tel:${data.contact_number}`}>{data.contact_number}</a> : '' }
              </p>
             {data.office_time && data.office_time ? <span>{data.office_time}</span> : ''}
            </div>
          </div>
          <div className={'form-outer'}>
          <div className={'contact-form'}>
        <form
          data-netlify={'true'}
          name={'contact-us'}
          method={'post'}
          onSubmit={submitContactForm}
        >
          <input type={'hidden'} name={'form-name'} value={'contact-us'} />
          <input type={'hidden'} name={'subject'} value={subject} />
          <div className={'form-group'}>
            <label className={'control-label'} htmlFor={'fname'}>
              Name*
            </label>
            <input
              type={'text'}
              id={'fname'}
              name={'fname'}
              size={'40'}
              className={'form-control'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <label className={'control-label'} htmlFor={'email'}>
              Email*
            </label>
            <input
              type={'email'}
              name={'email'}
              id={'email'}
              size={'40'}
              className={'form-control'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <label className={'control-label'} htmlFor={'phone'}>
              Phone
            </label>
            <input
              type={'text'}
              name={'phone'}
              id={'phone'}
              size={'40'}
              className={'form-control'}
            />
          </div>
          <div className={'form-group'}>
            <label htmlFor={'message'} className={'control-label'}>
              Your message*
            </label>
            <textarea
              name={'message'}
              id={'message'}
              cols={'40'}
              rows={'7'}
              className={'form-control'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <ReCAPTCHA
              sitekey={'6LdqB4UbAAAAAOUb6IUrB99qCUvDJGH38JtqUgBC'}
              ref={e => reCaptchaReference(e)}
              onChange={verifyCaptcha}
              onExpired={expiredCaptcha}
            />
          </div>
          {message && (
            <div className={`alert alert-${responseColor} submit-response`}>
              {message}
            </div>
          )}
          <div className={'form-submit'}>
            <input
              type={'submit'}
              value={'Send Message'}
              className={'btn-submit'}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
