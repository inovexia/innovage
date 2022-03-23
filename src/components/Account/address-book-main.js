import React, { useContext, useState } from "react"
import { useQuery } from "react-apollo"
import gql from "graphql-tag"

import { StoreContext } from "~/provider"
import AddAddressForm from "~/components/Account/adresses/addAddressForm"
import DeleteAddress from "~/components/Account/adresses/deleteAddress"
import EditAddressForm from "~/components/Account/adresses/editAddressForm"
import Loader from "~/images/loader.gif"

const CUSTOMER_ADDRESS = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      defaultAddress {
        address1
        address2
        city
        country
        firstName
        id
        lastName
        zip
      }
      addresses(first: 250) {
        edges {
          node {
            id
            address1
            address2
            city
            phone
            lastName
            firstName
            country
            name
            zip
          }
        }
      }
    }
  }
`

const AddressBookMain = () => {
  const { customerAccessToken } = useContext(StoreContext),
    [defaultAddress, setDefaultAddress] = useState(null),
    [addresses, setAddresses] = useState(null),
    { loading } = useQuery(CUSTOMER_ADDRESS, {
      variables: {
        customerAccessToken: customerAccessToken.accessToken,
      },
      onCompleted: data => {
        if (data) {
          if (data.customer) {
            const {
              customer: { defaultAddress, addresses },
            } = data
            setDefaultAddress(defaultAddress)
            setAddresses(addresses)
          }
        }
      },
    })

  return (
    <div className={"account-main"}>
      {loading ? (
        <div
          className={"d-flex h-100 justify-content-center align-items-center"}
        >
          <div
            className={'spinner-grows'}
            style={{ width: '3rem', height: '3rem' }}
            role={'status'}
          >
           
            <img src={Loader} alt="loader" />
          </div>
        </div>
      ) : (
        <>
          <div className={"address-book-details"}>
            {addresses != null &&
              addresses.edges.map((address, index) => {
                return (
                  <div className={"contact row"} key={address.node.id}>
                    <div className={"col-md-6 col-12"}>
                      <div className={"d-flex flex-column"}>
                        <div className={"contact-information"}>
                          <h3>BILLING ADDRESS</h3>
                          <h5>{`Address ${index + 1}`}</h5>
                          {address.node.firstName !== "" && (
                            <span>
                              {address.node.firstName} {address.node.lastName}
                            </span>
                          )}
                          {address.node.address1 && (
                            <span>{address.node.address1}</span>
                          )}
                          {address.node.address2 && (
                            <span>{address.node.address2}</span>
                          )}
                          <span>
                            {address.node.zip}, {address.node.city},{" "}
                            {address.node.country}
                          </span>
                          <div className={"link mb-3"}>
                            <EditAddressForm
                              address={address.node}
                              isDefault={defaultAddress.id === address.node.id}
                            />
                            <DeleteAddress id={address.node.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {defaultAddress.id === address.node.id && (
                      <div className={"contact-information col-md-6 col-12"}>
                        <h3>SHIPPING ADDRESS</h3>
                        <p>This address will be used</p>
                        <p>as default shipping address.</p>
                        <div className={"link"}>
                          <AddAddressForm />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}

export default AddressBookMain
