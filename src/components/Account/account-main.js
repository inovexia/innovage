import React, { useContext, useState } from 'react'
import { navigate } from 'gatsby'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { Modal, Toast } from 'react-bootstrap'
import * as CheckPhone from 'phone'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from "~/images/loader.gif"

import { StoreContext } from '~/provider'

const CUSTOMER_INFO = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      lastName
      phone
      acceptsMarketing
      defaultAddress {
        firstName
        lastName
        address1
        address2
        city
        zip
        country
      }
    }
  }
`
const CUSTOMER_UPDATE = gql`
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
      customer {
        acceptsMarketing
        email
        firstName
        lastName
        phone
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const Main = () => {
  const { customerAccessToken, setValue } = useContext(StoreContext),
    [acceptsMarketing, setAcceptsMarketing] = useState(null),
    [defaultAddress, setDefaultAddress] = useState(null),
    [response, setResponse] = useState(false),
    [responseMessage, setResponseMessage] = useState(null),
    [email, setEmail] = useState(null),
    [firstName, setFirstName] = useState(null),
    [lastName, setLastName] = useState(null),
    [phone, setPhone] = useState(null),
    [newPassword, setNewPassword] = useState(null),
    [password, setPassword] = useState(null),
    [editInfo, doEditInfo] = useState(false),
    [changePassword, doChangePassword] = useState(false),
    { loading } = useQuery(CUSTOMER_INFO, {
      variables: {
        customerAccessToken: customerAccessToken.accessToken,
      },
      onCompleted: data => {
        if (data && data.customer) {
          const {
            customer: {
              acceptsMarketing,
              defaultAddress,
              email,
              firstName,
              lastName,
              phone,
            },
          } = data
          setAcceptsMarketing(acceptsMarketing)
          setDefaultAddress(defaultAddress)
          setEmail(email)
          setFirstName(firstName)
          setLastName(lastName)
          setPhone(phone)
        }
      },
    }),
    [updateCustomer] = useMutation(CUSTOMER_UPDATE, {
      onCompleted: data => {
        if (data && data.customerUpdate) {
          const {
            customerUpdate: { customer, customerAccessToken },
          } = data
          if (customerAccessToken !== null) {
            setValue(customerAccessToken)
            doChangePassword(false)
            setResponseMessage('Password Updated Successfully')
            setResponse(true)
          }
          if (customer !== null) {
            const { acceptsMarketing, email, firstName, lastName, phone } =
              customer
            setAcceptsMarketing(acceptsMarketing)
            setEmail(email)
            setFirstName(firstName)
            setLastName(lastName)
            setPhone(phone)
            doEditInfo(false)
          }
        }
      },
    }),
    toggleSubscription = setToValue => {
      updateCustomer({
        variables: {
          customerAccessToken: customerAccessToken.accessToken,
          customer: {
            acceptsMarketing: setToValue,
          },
        },
      })
    }

  return (
    <div className={'account-main'}>
      {loading ? (
        <div
          className={'d-flex h-100 justify-content-center align-items-center'}
        >
          <div
            className={'spinner-grows'}
            style={{ width: '3rem', height: '3rem' }}
            role={'status'}
          >
            {/* <span className={'visually-hidden'}>{'Fetching...'}</span> */}
            <img src={Loader} alt="loader" />
          </div>
        </div>
      ) : (
        <>
          <div className={'my-account-details'}>
            <div className={'contact row g-0'}>
              <h2 className={`account-info`}>Account Information</h2>
              <div className={'contact-information col-md-6 col-12'}>
                <h3>Contact Information</h3>
                <span>
                  <strong>Name:</strong>
                  <br />
                  <span>{`${firstName} ${lastName}`}</span>
                </span>
                <span>
                  <strong>Email:</strong> <br />
                  <span>{email}</span>
                </span>
                <div className={'link'}>
                  <button
                    aria-label={'Edit Information'}
                    type={'button'}
                    onClick={() => doEditInfo(true)}
                  >
                    Edit Information
                  </button>
                  <button
                    aria-label={'Change Password'}
                    type={'button'}
                    onClick={() => doChangePassword(true)}
                  >
                    Change Password
                  </button>
                </div>
                <Modal
                  className={'account-modal'}
                  show={editInfo}
                  onHide={() => doEditInfo(false)}
                  centered={true}
                >
                  <Modal.Body>
                    <button
                      type={'button'}
                      className={'btn-dismiss'}
                      aria-label={'Close Modal'}
                      onClick={() => doEditInfo(false)}
                    />
                    <form
                      className={'modal-form'}
                      onSubmit={event => {
                        event.preventDefault()
                        const new_name = event.target.name.value.split(' '),
                          last_Name = new_name.pop(),
                          first_Name = new_name.join(' '),
                          new_email = event.target.email.value,
                          new_phone = CheckPhone(
                            event.target.phone.value,
                            'CAN'
                          )[0]
                        updateCustomer({
                          variables: {
                            customerAccessToken:
                              customerAccessToken.accessToken,
                            customer: {
                              email: new_email,
                              firstName: first_Name,
                              lastName: last_Name,
                              phone: new_phone,
                            },
                          },
                        })
                      }}
                    >
                      <div className="form-header">
                        <h4>Edit Information</h4>
                      </div>
                      <div className={'form-field'}>
                        <div className="field mt-auto">
                          <input
                            type="text"
                            name="name"
                            aria-label="Name"
                            placeholder="Name"
                            defaultValue={`${firstName} ${lastName}`}
                            onChange={() =>
                              false && console.log('Name Changed')
                            }
                          />
                        </div>
                        <div className="field mt-auto">
                          <input
                            type="email"
                            name="email"
                            aria-label="Email"
                            placeholder="Email"
                            defaultValue={email}
                            onChange={() =>
                              false && console.log('Email Changed')
                            }
                          />
                        </div>
                        <div className="field mt-auto">
                          <input
                            type="tel"
                            name="phone"
                            aria-label="Mobile"
                            placeholder="Mobile"
                            defaultValue={phone}
                            onChange={() =>
                              false && console.log('Phone Changed')
                            }
                          />
                        </div>
                        <div className="field d-flex justify-content-between mt-auto">
                          <button
                            type={'button'}
                            className={'btn btn-demo-primary-dark btn-submit'}
                            onClick={() => doEditInfo(false)}
                          >
                            CANCEL
                          </button>
                          <button
                            type={'submit'}
                            className={'btn btn-demo-primary btn-submit'}
                          >
                            SAVE & CONTINUE
                          </button>
                        </div>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                <Modal
                  className={'account-modal'}
                  show={changePassword}
                  onHide={() => doChangePassword(false)}
                  centered={true}
                >
                  <Modal.Body>
                    <button
                      type={'button'}
                      className={'btn-dismiss'}
                      aria-label={'Close Modal'}
                      onClick={() => doChangePassword(false)}
                    />
                    <form
                      className={'reset-account-form'}
                      onSubmit={event => {
                        event.preventDefault()
                        if (password) {
                          updateCustomer({
                            variables: {
                              customerAccessToken:
                                customerAccessToken.accessToken,
                              customer: {
                                password: password,
                              },
                            },
                          })
                        } else {
                          alert('Password Mismatch')
                        }
                      }}
                    >
                      <div className="form-header">
                        <h4>Change Password</h4>
                      </div>

                      <div className={'form-field'}>
                        <div className={'field mt-auto'}>
                          <input
                            type={'password'}
                            placeholder={'Current password'}
                            required={true}
                          />
                        </div>
                        <div className={'field mt-auto'}>
                          <input
                            type={'password'}
                            placeholder={'New password'}
                            onChange={({ target: { value } }) => {
                              setNewPassword(value)
                            }}
                          />
                        </div>
                        <div className={'field mt-auto'}>
                          <input
                            type={'password'}
                            placeholder={'Confirm password'}
                            onChange={({ target: { value } }) => {
                              newPassword === value && setPassword(value)
                            }}
                          />
                        </div>
                        <div className="field d-flex justify-content-between mt-auto">
                          <button
                            type={'button'}
                            className={'btn btn-demo-primary-dark btn-submit'}
                            onClick={() => doChangePassword(false)}
                          >
                            CANCEL
                          </button>
                          <button
                            type={'submit'}
                            className={'btn btn-demo-primary btn-submit'}
                            disabled={!(newPassword === password)}
                          >
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                {response && (
                  <ToastContainer
                    className={'p-3 position-fixed'}
                    position={'bottom-center'}
                  >
                    <Toast bg={'demo-primary'} show={response}>
                      <div className="d-flex">
                        <Toast.Body>{responseMessage}</Toast.Body>
                        <button
                          type="button"
                          className="btn-close me-2 m-auto"
                          aria-label="Close"
                          onClick={() => {
                            setResponse(false)
                            setResponseMessage(null)
                          }}
                        />
                      </div>
                    </Toast>
                  </ToastContainer>
                )}
              </div>
            </div>
            <div className={'contact row'}>
            <h2 className={`account-info`}>Address Information</h2>
              <div className={'contact-information col-md-6 col-12'}>
                <h3>Shipping Address</h3>
                {defaultAddress && (
                  <div className={'address'}>
                    {defaultAddress.firstName !== '' && (
                      <p>
                        <strong>
                          {defaultAddress.firstName} {defaultAddress.lastName}
                        </strong>
                      </p>
                    )}
                    {defaultAddress.address1 && (
                      <p>{defaultAddress.address1}</p>
                    )}
                    {defaultAddress.address2 && (
                      <p>{defaultAddress.address2}</p>
                    )}
                    <p>
                      {defaultAddress.zip}, {defaultAddress.city},{' '}
                      {defaultAddress.country}
                    </p>
                  </div>
                )}
                <div className={'link'}>
                  <button
                    type={'button'}
                    onClick={() => navigate('/account/address-book/')}
                  >
                    {defaultAddress ? 'Edit Address' : 'Add Address'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Main
