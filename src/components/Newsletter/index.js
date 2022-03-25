import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import ReactHtmlParser from 'html-react-parser'
import useOnScreen from '../functions/useOnScreen'
import NewsletterData from '../constants/components/newsletter-data'

const NewsLetter = ({ data }) => {
    const {FormData} = NewsletterData(),
    [sending, setSending] = useState(false),
    [email, setEmail] = useState(''),
    [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [response, setResponse] = useState(null),
    [loadedOnce, setLoadedOnce] = useState(false),
    sectionRef = useRef(),
    visible = useOnScreen(sectionRef, '100px'),
    handleSubmit = async e => {
      e.preventDefault()
      setSending(true)
      const response = await addToMailchimp(email, {
        FNAME: firstName,
        LNAME: lastName,
      })
      if (response.result === 'error') {
        if (response.msg.includes('already')) {
          response.msg = `${email} is already subscribed.`
        }
        setResponse(response)
        setSending(false)
      } else {
        response.msg =
          'Thank you for subscribing our newsletter.'
        setResponse(response)
        setEmail('')
        setFirstName('')
        setLastName('')
        setSending(false)
      }
    }

  useEffect(() => {
    !loadedOnce && setLoadedOnce(visible)
  }, [loadedOnce, visible])

  return (
    <section ref={sectionRef} className={'newsletter py-5'}>
      {(visible || loadedOnce) && (
        <Container fluid={true}>
          <div className={'newsletter-grid'}>
            <div className={'newsletter-content text-center w-100'}>
              <div className={'d-block d-md-flex justify-content-between'}>
                <div className={'newsletter-header w-100 text-center'}>
                  <h3>{FormData.title}</h3>
                  <p
                    className={
                      response !== null && response.result !== 'error'
                        ? 'text-success'
                        : response?.result === 'error'
                        ? 'text-danger'
                        : ''
                    }
                  >
                    {ReactHtmlParser(response ? response.msg : FormData.subscribeText)}
                  </p>
                </div>
              </div>
              <div className={'subscribe-form'}>
                <form className={'h-100'} onSubmit={handleSubmit}>
                  <div className="row row-form">
                    <div
                      className={
                        'input-control col-12 col-md-6'
                      }
                    >
                      <input
                        type={'text'}
                        name={'FNAME'}
                        placeholder={FormData.placeholderFname}
                        value={firstName}
                        disabled={
                          response !== null && response.result !== 'error'
                        }
                        onChange={({ target: { value } }) =>
                          setFirstName(value)
                        }
                        className={`w-100`}
                      />
                    </div>
                    <div
                      className={
                        'input-control col-12 col-md-6'
                      }
                    >
                      <input
                        type={'text'}
                        name={'LNAME'}
                        placeholder={FormData.placeholderLname}
                        value={lastName}
                        disabled={
                          response !== null && response.result !== 'error'
                        }
                        onChange={({ target: { value } }) => setLastName(value)}
                        className={`w-100`}
                      />
                    </div>
                  </div>
                  <div className="row-form">
                    <div className={'input-control h-100 col-12'}>
                      <input
                        type={'email'}
                        name={'text'}
                        placeholder={FormData.placeholder}
                        value={email}
                        disabled={
                          response !== null && response.result !== 'error'
                        }
                        onChange={({ target: { value } }) => setEmail(value)}
                        className={`w-100`}
                      />
                    </div>
                    <button
                      aria-label={FormData.btnText}
                      type={'submit'}
                      className={'btn subscribe-btn h-100'}
                      disabled={sending}
                    >
                      <div className={'d-flex justify-content-between'}>
                        <strong className={'my-auto'}>{FormData.btnText}</strong>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  )
}

export default NewsLetter
