import React, { useContext, useState } from 'react'
//import ReactHtmlParser from 'html-react-parser'

import { StoreContext } from '~/provider'
import Minus from '~/components/icons/minus'
import Plus from '~/components/icons/plus'
import Delete from '~/components/icons/delete'
import GetPrice from '~/components/functions/get-price'

const LineItem = ({ item }) => {
  const {
      removeLineItem,
      updateLineItem,
      store: { client, checkout },
    } = useContext(StoreContext),
    [quantity, setQuantity] = useState(item.quantity),
    variantImage = item.variant.image ? (
      <img
        src={item.variant.image.src}
        alt={`${item.title} product shot`}
        height={'60px'}
      />
    ) : null,
    updateQuantity = newQuantity => {
      setQuantity(newQuantity)
      newQuantity !== 0
        ? updateLineItem(client, checkout.id, item.id, newQuantity)
        : removeLineItem(client, checkout.id, item.id)
    },
    dropQuantity = () => {
      if (quantity === 0) {
        return false
      }
      quantity >= 0 && updateQuantity(quantity - 1)
    },
    raiseQuantity = () => {
      updateQuantity(quantity + 1)
    },
    removeItem = () => {
      removeLineItem(client, checkout.id, item.id)
    }

  return (
    <>
      <div className={'item-row d-flex flex-row'}>
        <div className={'item-meta'}>
        <div className={'remove-item'}>
              <button className={'remove-btn'} onClick={removeItem}>
                <Delete />
              </button>
            </div>
          <div className={'item-image'}>{variantImage}</div>
         
        </div>
        <div className={'item-data d-flex'}>
          <div className={'item-details'}>
            <div className={'details'}>
              <p className={'item-title'}>{item.title}</p>
              <p className={'price'}>
                Price<span>{GetPrice(item.variant.price, 2)}</span>
              </p>
              <div className={'quantity-selector'}>
                <button
                  type={'button'}
                  className={'btn-quantity minus'}
                  aria-label={'Quantity Minus'}
                  onClick={dropQuantity}
                >
                  <Minus />
                </button>
                <span className={'quantity-value'}>{quantity}</span>
                <button
                  type={'button'}
                  className={'btn-quantity plus'}
                  aria-label={'Quantity Plus'}
                  onClick={raiseQuantity}
                >
                  <Plus />
                </button>
              </div>
              <p className={'subtotal'}>
                Subtotal
                <span>{GetPrice(item.variant.price * quantity, 2)}</span>
              </p>
            </div>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default LineItem
