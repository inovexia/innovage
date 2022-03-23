import React, { useContext, useEffect, useState } from "react"
import { navigate } from "gatsby"
import { useMutation } from "react-apollo"
import gql from "graphql-tag"

import { StoreContext } from "~/provider"

const CUSTOMER_RESET = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
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
    [resetToken, setResetToken] = useState(null),
    [newPassword, setNewPassword] = useState(null),
    [password, setPassword] = useState(null),
    {
      store: { checkout },
      setValue,
    } = useContext(StoreContext),
    [customerAssociate] = useMutation(CHECKOUT_CUSTOMER_ASSOCIATE, {
      onCompleted: data => {
        if (data) {
          navigate(`/account/`)
        }
      },
    }),
    [resetCustomer] = useMutation(CUSTOMER_RESET, {
      onCompleted: data => {
        if (data) {
          setValue(data.customerReset.customerAccessToken)
          customerAssociate({
            variables: {
              checkoutId: checkout.id,
              customerAccessToken:
                data.customerReset.customerAccessToken.accessToken,
            },
          })
        }
      },
    })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      params.get("id") &&
        setCustomerId(window.btoa(`gid://shopify/Customer/${params.get("id")}`))
      params.get("token") && setResetToken(params.get("token"))
    }
  }, [])

  return (
    <section className={"section-reset"}>
      <div className={"container-fluid"}>
        <h1 className={"text-center display-1"}>Reset Your Account</h1>
        <div className={"row justify-content-center"}>
          <div className={"col-md-6"}>
            <form
              className={"reset-account-form border p-4"}
              onSubmit={event => {
                event.preventDefault()
                if (password) {
                  resetCustomer({
                    variables: {
                      id: customerId,
                      input: {
                        resetToken: resetToken,
                        password: password,
                      },
                    },
                  })
                } else {
                  console.log("password mismatch")
                }
              }}
            >
              <div className={"field mb-4"}>
                <input
                  type={"password"}
                  className={"form-control new"}
                  placeholder={"New password"}
                  onChange={({ target: { value } }) => {
                    setNewPassword(value)
                  }}
                />
              </div>
              <div className={"field mb-4"}>
                <input
                  type={"password"}
                  className={"form-control confirm"}
                  placeholder={"Confirm password"}
                  onChange={({ target: { value } }) => {
                    newPassword === value && setPassword(value)
                  }}
                />
              </div>
              <button
                type={"submit"}
                className={"btn btn-demo-primary"}
                disabled={!(newPassword === password)}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reset
