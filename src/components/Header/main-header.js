/* eslint-disable */
import React, { useContext, useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useIsMounted } from "react-tidy"
import { Link, navigate } from "gatsby"

import { Navbar, Container, Nav, Tab, Modal} from "react-bootstrap"

import { StoreContext } from "~/provider"
import GetPrice from "~/components/functions/get-price"
import Logo from "~/components/icons/logo"
import GSIcon from "~/components/gs-icon"
import Login from "./login"
import Register from "./register"

const MainHeader = ({
  data: {
    siteHome,
    siteLogo,
    navigation: { leftNav },
    myAccountLabel,
    cartLabel,
    megaMenuData,
    megaMenuData: [initialItem],
  },
}) => {
  const countQuantity = lineItems => {
      let quantity = 0
      lineItems.forEach(item => {
        quantity = quantity + item.quantity
      })
      return quantity
    },
    {
      customerAccessToken,
      store: {
        checkout: { lineItems, subtotalPrice, webUrl },
      },
    } = useContext(StoreContext),
    isMounted = useIsMounted(),
    [quantity, setQuantity] = useState(
      countQuantity(lineItems ? lineItems : [])
    ),
    [activeItem, updateActiveItem] = useState(initialItem.label),
    [activeImage, updateActiveImage] = useState(initialItem.image),
    [searchQuery, setSearchQuery] = useState(""),
    [showSearch, setShowSearch] = useState(false),
    [showFlyingCart, setShowFlyingCart] = useState(false),
    [showMegaMenu, setShowMegaMenu] = useState(false),
    [show, setShow] = useState(false),
    [isTablet, setTablet] = useState(false),
    handleClose = () => setShow(false),
    handleShow = () => setShow(true),
    toggleMegaMenu = () => {
      const body = document.querySelector("body")
      if (isMounted()) {
        setShowMegaMenu(!showMegaMenu)
        updateActiveItem(initialItem.label)
        updateActiveImage(initialItem.image)
        body.classList.contains("overflow-hidden")
          ? body.removeAttribute("class")
          : body.classList.add("overflow-hidden")
      }
    },
    closeMegaMenu = () => {
      const body = document.querySelector("body")
      if (isMounted()) {
        setShowMegaMenu(false)
        updateActiveItem(initialItem.label)
        updateActiveImage(initialItem.image)
        body.removeAttribute("class")
      }
    },
    openSearch = () => {
      isMounted() && setShowSearch(true)
    },
    closeSearch = () => {
      isMounted() && setShowSearch(false)
    },
    openFlyingCart = () => {
      isMounted() && setShowFlyingCart(true)
    },
    closeFlyingCart = () => {
      isMounted() && setShowFlyingCart(false)
    },
    isAuthenticated =
      customerAccessToken &&
      customerAccessToken.expiresAt &&
      customerAccessToken.expiresAt > new Date().toISOString()
        ? true
        : false

  useEffect(() => {
    if (isMounted() && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      params.get("s") && setSearchQuery(params.get("s"))
      setQuantity(countQuantity(lineItems ? lineItems : []))
      setTablet(window.outerWidth < 992 ? true : false)
      window.addEventListener("resize", () => {
        setTablet(window.outerWidth < 992 ? true : false)
      })

      
       
    }
  }, [isMounted, lineItems, setTablet])

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Link to={'/'} className={`logo`}>
    <img
      loading={'lazy'}
      src={
        siteLogo.childImageSharp.gatsbyImageData.images
          .fallback.src
      }
      alt={'Logo'}
      height={
        siteLogo.childImageSharp.gatsbyImageData.height
      }
      width={
        siteLogo.childImageSharp.gatsbyImageData.width
      }
      className={`mb-0`}
    />
  </Link>

  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    {leftNav.map(({ type, link, label }, index) => {
        return (
          
          <Link
            to={link}
            className={"link"}
          >
            {label}
          </Link>
      
        )
      })}
    </Nav>
    <Nav>
    <div className={"right-nav"}>
                <ul className={`menu-wrapper d-flex m-0`}>
                  <li className={"menu-item ml-2 mb-3 mb-md-0"}>
                    <button
                      type={"button"}
                      aria-label={"Search"}
                      onClick={() => openSearch()}
                    >
                      <GSIcon icon={`gs-search-d`} />
                    </button>
                  </li>
                  <li className={"menu-item"}>
                    {isAuthenticated ? (
                      <Link to={"/account/"} onClick={() => closeMegaMenu()}>
                        <span>{myAccountLabel}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          closeMegaMenu()
                          handleShow()
                        }}
                        aria-label={"Login"}
                      >
                        <span>{"Login"}</span>
                      </button>
                      // <Link to={`/login`} >Login</Link>
                    )}
                  </li>
                  <li className={"menu-item"}>
                    <button
                      className={"toggle-cart"}
                      onClick={() => {
                        closeMegaMenu()
                        openFlyingCart()
                      }}
                    >
                      <span className={"label"}>{cartLabel}</span>
                      <span className={"quantity"}>
                        {quantity < 10 ? quantity : `9+`}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
      {showSearch && (
        <div
          className={"background-overlay"}
          aria-label={"Search Background"}
          role={"button"}
          onClick={() => closeSearch()}
          onKeyDown={() => closeSearch()}
          tabIndex={-10}
        />
      )}
      {showSearch && (
        <form
          className={`search-box`}
          action={"/search"}
          onSubmit={event => {
            event.preventDefault()
            if (!window.location.href.includes(event.target.action)) {
              const url = new URL(event.target.action)
              url.searchParams.set("s", searchQuery)
              closeSearch()
              navigate(`${url.pathname}${url.search}`)
            } else {
              closeSearch()
              event.target.submit()
            }
          }}
        >
          <input
            type={"text"}
            name={"s"}
            autoFocus={showSearch}
            required={true}
            placeholder={"Search for Products"}
            onChange={({ target: { value } }) => setSearchQuery(value)}
            className={`search-input`}
            defaultValue={searchQuery}
          />
          <button
            className={"btn-search"}
            type={"submit"}
            aria-label={"Search"}
          >
            <GSIcon icon={"gs-search-d"} />
          </button>
        </form>
      )}
      {showFlyingCart && (
        <div
          className={"background-overlay"}
          aria-label={"Cart Background"}
          role={"button"}
          onClick={() => closeFlyingCart()}
          onKeyDown={() => closeFlyingCart()}
          tabIndex={-10}
        />
      )}
      <div className={`flying-cart${showFlyingCart ? " show" : ""}`}>
        <div className={"wrapper"}>
          <div className={"cart-title"}>
            <h4>SHOPPING CART</h4>
            <button
              className={"btn-dismiss"}
              aria-label={"Close Cart"}
              onClick={() => closeFlyingCart()}
            />
          </div>
          <div className={"cart-content"}>
            {lineItems.length > 0 ? (
              <ul className={"cart-list"}>
                {lineItems.map((lineItem, index) => (
                  <li key={index} className={"cart-item"}>
                    <div className={"item-image"}>
                      <img
                        alt={`variant-${index}`}
                        src={lineItem.variant.image.src}
                      />
                    </div>
                    <div className={"item-content"}>
                      <div className="item-name">{lineItem.title}</div>
                      <span className={"item-amount"}>
                        <span
                          className={"item-qty"}
                        >{`${lineItem.quantity}x`}</span>
                        <strong className={"money"}>
                          {GetPrice(lineItem.quantity * lineItem.variant.price)}
                        </strong>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={"cart-empty"}>
                <p className={"message"}>No products in the cart.</p>
                <div className={"cart-return"}>
                  <Link
                    to={"/all-products/"}
                    className={"btn btn-demo-default"}
                    onClick={() => closeFlyingCart()}
                  >
                    Return To Shop
                  </Link>
                </div>
              </div>
            )}
            {lineItems.length > 0 && (
              <div className={"cart-meta"}>
                <hr className={"cart-rule"} />
                <div className={"cart-total"}>
                  <span>Subtotal</span>
                  <strong className={"money"}>{GetPrice(subtotalPrice)}</strong>
                </div>
                <div className={"cart-actions"}>
                  <Link
                    to={"/cart/"}
                    onClick={() => closeFlyingCart()}
                    className={"btn btn-demo-default"}
                  >
                    View cart
                  </Link>
                  <button
                    type={"button"}
                    onClick={() => {
                      closeFlyingCart()
                      window.location.href = webUrl
                    }}
                    className={"btn btn-demo-primary"}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {!isAuthenticated && (
        <Modal
          className={"account-modal"}
          show={show}
          onHide={handleClose}
          centered={true}
        >
          <Modal.Body>
            <button
              type={"button"}
              className={"btn-dismiss"}
              aria-label={"Close Modal"}
              onClick={handleClose}
            />
            <Tab.Container defaultActiveKey={"login"}>
              <Nav>
                <Nav.Item>
                  <Nav.Link eventKey={"login"}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"register"}>Registration</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey={"login"} mountOnEnter={true}>
                  <Login doDismiss={handleClose} />
                </Tab.Pane>
                <Tab.Pane eventKey={"register"} mountOnEnter={true}>
                  <Register doDismiss={handleClose} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default MainHeader
