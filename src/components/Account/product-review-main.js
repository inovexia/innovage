import React from 'react'

import GSIcon from '~/components/gs-icon'

const ProductReviewMain = () => {
  return (
    <div className={'account-main'}>
      <div className={'product-review-details'}>
        <div className={'review'}>
          <div className={'review-inner'}>
            <div className={'review-information'}>
              <h5>Root Beer Donut</h5>
              <p>
                I love this soap, it smells as good as it looks! The urge to
                take a bit at it is huge, it’s just too cute.
              </p>
              <div className={'link'}>
                <button type={'button'}>Delete</button>
              </div>
            </div>

            <div className={'rating'}>
              {Array(5)
                .fill()
                .map((_, i) => {
                  return (
                    <GSIcon
                      key={i}
                      icon={`gs-star${i + 1 > 4 ? ' fade' : ''}`}
                    />
                  )
                })}
              <p>02 Apr 2021</p>
            </div>
          </div>
        </div>

        <div className={'review'}>
          <div className={'review-inner'}>
            <div className={'review-information'}>
              <h5>Root Beer Donut</h5>
              <p>
                I love this soap, it smells as good as it looks! The urge to
                take a bit at it is huge, it’s just too cute.
              </p>
              <div className={'link'}>
                <button type={'button'}>Delete</button>
              </div>
            </div>

            <div className={'rating'}>
              {Array(5)
                .fill()
                .map((_, i) => {
                  return (
                    <GSIcon
                      key={i}
                      icon={`gs-star${i + 1 > 4 ? ' fade' : ''}`}
                    />
                  )
                })}
              <p>02 Apr 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductReviewMain
