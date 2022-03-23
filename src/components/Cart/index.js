import React, { useContext } from "react"
import { Link } from "gatsby"

import { StoreContext } from "~/provider"
import LineItem from "./LineItem"

const Cart = () => {
  const {
      store: { checkout },
    } = useContext(StoreContext),
    handleCheckout = () => {
      window.location.href = checkout.webUrl
    }

  return (
    <>
      <div className={"cart-page"}>
        {checkout.lineItems && checkout.lineItems.length ? (
          <>
           
            <div className={"cart-inner py-5"}>
              <div className={"container-fluid"}>
                <div className={"cart-data d-block d-lg-flex flex-row"}>
                  <div className={"shopping-cart"}>
                    <div className={`row`}>
                    <div className={"cart-title"}>
                      <h2>CART</h2>
                    </div>
                    </div>
                    <div className={"shopping-cart-data"}>
                      {checkout.lineItems.map(item => (
                        <LineItem key={item.id.toString()} item={item} />
                      ))}
                    </div>
                  </div>
                 
                  <div className={"order-summary"}>
                    <div className={`row`}>
                    
                    </div>
                    <div className={"summary-data"}>
                      <div className={"subtotal-box"}>
                      <div className={"summary-title mb-5"}>
                      <h2>Order summary</h2>
                    </div>
                        <ul>
                          <li>
                            Subtotal: <span>${checkout.subtotalPrice}</span>
                          </li>
                          <li>
                            Taxes: <span>${checkout.totalTax}</span>
                          </li>
                          <li>
                            Estimated Total: <span>${checkout.totalPrice}</span>
                          </li>
                        </ul>
                        <div className={"row mx-0 checkout-btn"}>
                          <button
                            className={"btn btn-demo-primary"}
                            onClick={handleCheckout}
                            disabled={checkout.lineItems.length === 0}
                          >
                            CHECKOUT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"empty-cart"}>
              <h3>Your cart is currently empty.</h3>
              <Link className={"btn btn-demo-secondary"} to={"/all-products/"}>
                RETURN TO SHOP PAGE
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
