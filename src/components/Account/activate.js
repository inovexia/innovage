import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Alert } from 'react-bootstrap'

import { StoreContext } from '~/provider'

const CUSTOMER_ACTIVATE = gql`
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer {
        id
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

const CHECKOUT_CUSTOMER_ASSOCIATE = gql`
  mutation checkoutCustomerAssociateV2(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        id
      }
      customer {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

const Reset = () => {
  const [customerId, setCustomerId] = useState(null),
    [activationToken, setActivationToken] = useState(null),
    [password, setPassword] = useState(null),
    [errors, setErrors] = useState(null),
    {
      store: { checkout },
      setValue,
    } = useContext(StoreContext),
    [customerAssociate] = useMutation(CHECKOUT_CUSTOMER_ASSOCIATE, {
      onCompleted: data => {
        if (data) {
          const url = new URL(window.location)
          url.searchParams.delete('id')
          url.searchParams.delete('token')
          url.pathname = '/'
          window.history.replaceState({}, '', url)
          navigate(`/account/`)
        }
      },
    }),
    [activateCustomer] = useMutation(CUSTOMER_ACTIVATE, {
      onCompleted: data => {
        if (data) {
          if (data.customerActivate.customerUserErrors.length > 0) {
            setErrors(data.customerActivate.customerUserErrors)
            return
          }
          setValue(data.customerActivate.customerAccessToken)
          customerAssociate({
            variables: {
              checkoutId: checkout.id,
              customerAccessToken:
                data.customerActivate.customerAccessToken.accessToken,
            },
          })
        }
      },
    })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      params.get('id') &&
        setCustomerId(window.btoa(`gid://shopify/Customer/${params.get('id')}`))
      params.get('token') && setActivationToken(params.get('token'))
    }
  }, [setCustomerId, setActivationToken])

  return (
    <section className={'section-reset'}>
      <div className={'container-fluid'}>
        <h1 className={'text-center display-1'}>Activate Your Account</h1>
        <div className={'row justify-content-center'}>
          <div className={'col-md-4'}>
            <form
              className={'reset-account-form border p-4'}
              onSubmit={event => {
                event.preventDefault()
                activateCustomer({
                  variables: {
                    id: customerId,
                    input: {
                      activationToken: activationToken,
                      password: password,
                    },
                  },
                })
              }}
            >
              {errors &&
                errors.map(({ code, message }) => (
                  <Alert variant="info" className={'p-2'} key={code}>
                    <p className={'mb-0 px-1'}>{message}</p>
                  </Alert>
                ))}
              <div className={'field mb-4'}>
                <input
                  type={'password'}
                  className={'form-control confirm'}
                  placeholder={'Enter Your Password'}
                  onChange={({ target: { value } }) => {
                    setPassword(value.length > 0 ? value : null)
                  }}
                />
              </div>
              <button
                type={'submit'}
                className={'btn btn-demo-primary'}
                disabled={null === password}
              >
                Activate Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reset
