import React, { useState, useContext } from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

import { StoreContext } from "~/provider"
import ConnexionLayout from "~/components/customer/ConnexionLayout"

const CUSTOMER_LOGIN = gql`
  mutation customerCreate(
    $createInput: CustomerCreateInput!
    $loginInput: CustomerAccessTokenCreateInput!
  ) {
    customerCreate(input: $createInput) {
      customer {
        id
      }
      customerUserErrors {
        message
      }
    }
    customerAccessTokenCreate(input: $loginInput) {
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

const RegisterForm = ({ doDismiss}) => {
  const { setValue } = useContext(StoreContext),
    [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [email, setEmail] = useState(""),
    [phone, setPhone] = useState(""),
    [password, setPassword] = useState(""),
    handleCustomerAccessToken = value => {
      setValue(value)
    }

  return (
    <section className="register">
      <Mutation mutation={CUSTOMER_LOGIN}>
        {customerLogin => {
          return (
            <>
              <div className="field">
                <input
                  type="text"
                  name="name"
                  aria-label="Name"
                  placeholder="NAME"
                  onChange={({ target: { value } }) => {
                    const name = value.split(" ")
                    setLastName(name.pop())
                    setFirstName(name.join(" "))
                  }}
                />
              </div>
              <div className="field">
                <input
                  type="tel"
                  name="phone"
                  aria-label="Mobile"
                  placeholder="MOBILE"
                  onChange={({ target: { value } }) =>
                    setPhone(value.includes("+91") ? value : `+91${value}`)
                  }
                />
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  aria-label="Email"
                  placeholder="EMAIL"
                  onChange={({ target: { value } }) => setEmail(value)}
                />
              </div>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  aria-label="Password"
                  placeholder="PASSWORD"
                  onChange={({ target: { value } }) => setPassword(value)}
                />
              </div>
              <div className="field d-flex justify-content-between">
                {/* <button
                  className={"btn btn-demo-primary-dark btn-dismiss-modal"}
                  onClick={doDismiss}
                >
                  CANCEL
                </button> */}
                <button
                  className={"btn btn-demo-primary btn-register"}
                  onClick={() => {
                    if (email === "" || password === "") {
                      alert("Email and password are required")
                      return false
                    }
                    customerLogin({
                      variables: {
                        createInput: {
                          firstName: firstName,
                          lastName: lastName,
                          phone: phone,
                          email: email,
                          password: password,
                        },
                        loginInput: {
                          email: email,
                          password: password,
                        },
                      },
                    })
                      .then(result => {
                        if (result.data.customerCreate.customer !== null) {
                          handleCustomerAccessToken(
                            result.data.customerAccessTokenCreate
                              .customerAccessToken
                          )
                          // onSuccess()
                        } else {
                          alert(
                            result.data.customerCreate.customerUserErrors
                              .map(({ message }) => {
                                return message
                              })
                              .join(", ")
                          )
                        }
                      })
                      .catch(err => {
                        alert(
                          err.message.includes("Limit exceed")
                            ? "User register limit exceeded, Please try after some time."
                            : err.message
                        )
                      })
                  }}
                >
                  SUBMIT
                </button>
              </div>
            </>
          )
        }}
      </Mutation>
    </section>
  )
}

const Register = ({ doDismiss }) => {
  return (
    <ConnexionLayout>
      <RegisterForm doDismiss={doDismiss} />
    </ConnexionLayout>
  )
}

export default Register
