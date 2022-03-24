import React, { useState, useContext } from "react"
import { navigate } from "gatsby"
import { Alert } from "react-bootstrap"

import gql from "graphql-tag"
import { useMutation } from "react-apollo"
import { StoreContext } from "~/provider"
import ConnexionLayout from "~/components/customer/ConnexionLayout"

const CUSTOMER_LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
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

const CUSTOMER_PASSWORD_RESET = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const LoginForm = () => {
  const {
      store: { checkout },
      setValue,
    } = useContext(StoreContext),
    [passwordForgot, setPasswordForgot] = useState(false),
    [email, setEmail] = useState(""),
    [emailReset, setEmailReset] = useState(""),
    [messageInfo, setMessageInfo] = useState(""),
    [password, setPassword] = useState(null),
    [customerAssociate] = useMutation(CHECKOUT_CUSTOMER_ASSOCIATE, {
      onCompleted: data => {
        if (data) {
          // onSuccess()
          navigate(`/account/`)
        }
      },
    }),
    [customerLogin] = useMutation(CUSTOMER_LOGIN, {
      onCompleted: data => {
        if (data) {
          if (data.customerAccessTokenCreate.customerAccessToken !== null) {
            setValue(data.customerAccessTokenCreate.customerAccessToken)
            // Associate checkoutId with the the Logged In Customer
            customerAssociate({
              variables: {
                checkoutId: checkout.id,
                customerAccessToken:
                  data.customerAccessTokenCreate.customerAccessToken
                    .accessToken,
              },
            })
          } else {
            switch (
              data.customerAccessTokenCreate.customerUserErrors.pop().code
            ) {
              case "UNIDENTIFIED_CUSTOMER":
                alert("Email or Password is incorrect")
                break
              default:
            }
          }
        }
      },
    }),
    [customerRecover] = useMutation(CUSTOMER_PASSWORD_RESET, {
      onCompleted: data => {
        if (data) {
          setMessageInfo(
            "We've sent you an email with a link to update your password."
          )
          setPasswordForgot(false)
        }
      },
    })

  return (
    <>
      {passwordForgot ? (
        <section className="forgot-password">
          <Alert variant="info">
            <Alert.Heading>RESET YOUR PASSWORD</Alert.Heading>
            <p>We will send you an email to reset your password.</p>
          </Alert>
          <div className="field">
            <input
              type="email"
              aria-label="Email"
              placeholder="Email"
              onChange={({ target: { value } }) => setEmailReset(value)}
            />
          </div>
          <div className="field d-flex justify-content-between">
            <button
              className="btn btn-demo-primary btn-submit"
              onClick={() => {
                customerRecover({
                  variables: {
                    email: emailReset,
                  },
                })
              }}
            >
              SUBMIT
            </button>
            <button
              className="btn-back"
              onClick={() => setPasswordForgot(!passwordForgot)}
            >
              <span>Cancel</span>
            </button>
          </div>
        </section>
      ) : (
        <section className="login">
          {messageInfo && (
            <div className="notification is-success">{messageInfo}</div>
          )}
          <div className="field">
            <input
              type="email"
              aria-label="Email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="password"
              aria-label="Password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="field">
            <button
              className={"btn btn-demo-primary btn-submit"}
              onClick={() => {
                customerLogin({
                  variables: {
                    input: {
                      email: email,
                      password: password,
                    },
                  },
                })
              }}
            >
              SUBMIT
            </button>
          </div>
          <div className="field">
            <button
              className="btn-forgot"
              onClick={e => setPasswordForgot(!passwordForgot)}
            >
              Forgot your password?
            </button>
          </div>
        </section>
      )}
    </>
  )
}

const Login = ({ doDismiss }) => {
  return (
    <ConnexionLayout>
      <LoginForm doDismiss={doDismiss} />
    </ConnexionLayout>
  )
}

export default Login
