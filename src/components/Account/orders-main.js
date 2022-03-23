import React, { useContext, useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import { StoreContext } from '~/provider'
import FormatDate from '~/components/functions/format-date'
import GetPrice from '~/components/functions/get-price'
import Loader from "~/images/loader.gif"

const CUSTOMER_ORDERS = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ordersData: orders(first: 250) {
        orders: edges {
          order: node {
            name
            customerLocale
            orderNumber
            totalPrice
            subtotalPrice
            processedAt
            statusUrl
            financialStatus
            fulfillmentStatus
            currencyCode
            itemsData: lineItems(first: 250) {
              orderItems: edges {
                item: node {
                  title
                  quantity
                  variant {
                    id
                    image {
                      url
                    }
                    selectedOptions {
                      value
                      name
                    }
                    priceV2 {
                      amount
                    }
                  }
                }
              }
            }
            shippingAddress {
              address1
              city
              lastName
              firstName
              zip
              country
            }
          }
        }
      }
    }
  }
`

const OrdersMain = () => {
  const { customerAccessToken } = useContext(StoreContext),
    [orders, updateOrders] = useState([]),
    { loading } = useQuery(CUSTOMER_ORDERS, {
      variables: {
        customerAccessToken: customerAccessToken.accessToken,
      },
      onCompleted: data => {
        if (data) {
          const {
            customer: { ordersData },
          } = data
          ordersData && updateOrders(ordersData.orders)
        }
      },
    })

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
           
            <img src={Loader} alt="loader" />
          </div>
        </div>
      ) : (
        <>
          <div className={'my-orders'}>
            <div className={'header d-none d-lg-flex mt-0'}>
              <p>ORDER DATE</p>
              <p>ORDER NUMBER</p>
              <p>STATUS</p>
              <p>TRACKING</p>
            </div>
            <Accordion defaultActiveKey="0">
              {orders &&
                orders.length > 0 &&
                orders.map(
                  (
                    {
                      order: {
                        name,
                        orderNumber,
                        itemsData: { orderItems },
                        processedAt,
                        statusUrl,
                        financialStatus,
                        fulfillmentStatus,
                      },
                    },
                    i
                  ) => {
                    return (
                      <Card key={i}>
                        <Accordion.Item eventKey={i}>
                          <Accordion.Header style={{ width: '100%' }}>
                            <div className={'toggle-button'}>
                              <div className={'header d-lg-none'}>
                                <p>ORDER DATE</p>
                                <p>ORDER NUMBER</p>
                                <p>STATUS</p>
                                <p>TRACKING</p>
                              </div>
                              <div className={'accordion-list'}>
                                <span>
                                  {FormatDate(
                                    new Date(processedAt),
                                    'dd MMMM yyyy'
                                  )}
                                </span>
                                <span>{orderNumber}</span>
                                <span>{financialStatus}</span>
                                <a
                                  href={statusUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Check Status
                                </a>
                                <button
                                  type="button"
                                  className={
                                    'btn btn-demo-primary btn-submit d-none d-lg-block'
                                  }
                                >
                                  SEE MORE
                                </button>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <Card.Body>
                              <div className={'cart-items'}>
                                <div className={'items-list'}>
                                  <div
                                    className={
                                      'col-heading row mx-n2 d-none d-lg-flex gx-0'
                                    }
                                  >
                                    <div className={'th item-name col-4 px-2'}>
                                      Item
                                    </div>
                                    <div
                                      className={
                                        'th item-size col-3 text-left px-2'
                                      }
                                    >
                                      {orderItems &&
                                        orderItems.length > 0 &&
                                        orderItems[0].item &&
                                        orderItems[0].item.variant &&
                                        orderItems[0].item.variant
                                          .selectedOptions[0].name}
                                    </div>
                                    <div
                                      className={
                                        'th item-quantity col-3 text-left px-2'
                                      }
                                    >
                                      Quantity
                                    </div>
                                    <div
                                      className={
                                        'th item-price col-2 text-left px-2'
                                      }
                                    >
                                      Amount
                                    </div>
                                  </div>
                                  {orderItems &&
                                    orderItems.length > 0 &&
                                    orderItems.map(({ item }, j) => {
                                      return (
                                        <div
                                          key={j}
                                          className={
                                            'items-row mx-n2 d-block d-flex gx-0'
                                          }
                                        >
                                          <div
                                            className={
                                              'item-meta col-4 d-flex px-2'
                                            }
                                          >
                                            <div className={'item-image'}>
                                              {item.variant &&
                                                item.variant.image && (
                                                  <img
                                                    src={item.variant.image.url}
                                                    style={{
                                                      maxWidth: '50px',
                                                      height: 'auto',
                                                    }}
                                                    alt={`variant-${j}`}
                                                  />
                                                )}
                                            </div>
                                            <div className={'text item-name'}>
                                              <p>{item.title}</p>
                                              {item.variant &&
                                                item.variant
                                                  .selectedOptions[1] && (
                                                  <strong>
                                                    {
                                                      item.variant
                                                        .selectedOptions[1]
                                                        .value
                                                    }
                                                  </strong>
                                                )}
                                            </div>
                                          </div>
                                          <div
                                            className={
                                              'text item-size mt-3 mt-lg-0  col-3 text-right text-lg-left px-2'
                                            }
                                          >
                                            {item.variant && (
                                              <>
                                                <strong
                                                  className={
                                                    'size-label d-lg-none pr-4'
                                                  }
                                                >
                                                  {`${item.variant.selectedOptions[0].name}:`}
                                                </strong>{' '}
                                                <span>
                                                  {
                                                    item.variant
                                                      .selectedOptions[0].value
                                                  }
                                                </span>
                                              </>
                                            )}
                                          </div>
                                          <div
                                            className={
                                              'text item-quantity col-3 text-left px-2'
                                            }
                                          >
                                            <span>{item.quantity}</span>
                                          </div>
                                          <div
                                            className={
                                              'text item-price col-2 text-left px-2'
                                            }
                                          >
                                            {GetPrice(
                                              item.variant.priceV2.amount
                                            )}
                                          </div>
                                        </div>
                                      )
                                    })}
                                </div>
                              </div>
                            </Card.Body>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Card>
                    )
                  }
                )}
            </Accordion>
          </div>
        </>
      )}
    </div>
  )
}

export default OrdersMain
