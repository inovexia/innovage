import React from 'react'

const PaymentMethodMain = () => {
  return (
    <div className={'account-main'}>
      <div className={'payment'}>
        <div className={'payment-method-details'}>
          <p>Payment Methods</p>
          <h5>Default Payment Method</h5>
          <div className={'contact row'}>
            <div className={'contact-information col-6 '}>
              <span>Name:</span>
              <span>Card Number:</span>
              <span>Expiry Date:</span>
              <div className={'link d-none d-lg-block'}>
                <button type={'button'}>Delete</button>
                <button type={'button'}>Add New Card</button>
              </div>
            </div>

            <div className={'contact-information col-6 '}>
              <span>Visa</span>
              <span>*************4567</span>
              <span>10/2024</span>
            </div>

            <div className={'contact-information d-block d-lg-none col-12'}>
              <div className={'link'}>
                <button type={'button'}>Delete</button>
                <button type={'button'}>Add New Card</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodMain
