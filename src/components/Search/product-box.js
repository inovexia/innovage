import React from 'react'
import { useIsMounted } from 'react-tidy'
import { Link } from 'gatsby'

import isTablet from '~/components/functions/is-tablet'
//import getShortTitle from '~/components/functions/get-short-title'
import AddToBag from '~/components/AddToBag'
import onSale from '~/components/functions/on-sale'
import GetPrice from '~/components/functions/get-price'
import Offer from '~/components/icons/offer'

const ProductBox = ({
  product: {
    availableForSale,
    handle,
    images: {
      edges: [firstImage],
    },
    priceRange: {
      minVariantPrice: { amount: productPrice },
    },
    tags,
    title,
    variants: {
      edges: [firstVariant],
    },
  },
}) => {
  const isMounted = useIsMounted()
  return (
    isMounted() && (
      <div className={'col-xl-4 col-md-4 col-6'}>
        <div className={'box'}>
          {onSale(tags) && (
            <div className={'offer-wrap'}>
              <div className={'offer'}>
                <Offer
                  with={isTablet() ? 71 : 156}
                  height={isTablet() ? 72 : 157}
                />
                <div className={'offer-text'}>Sale</div>
              </div>
            </div>
          )}
          <div className={'product'}>
            <div className={'product-img'}>
              <img
                src={firstImage.node.url}
                alt={firstImage.node.altText || title}
                className={'img-fluid'}
              />
            </div>
            <div className={'content'}>
              <h5 className={'title'}>{title}</h5>
              <h6 className={'price'}>{GetPrice(productPrice)}</h6>
            </div>
            <div className={'actions'}>
              <div className={'learn-more text-center'}>
                <Link
                  className={'btn btn-demo-primary'}
                  to={`/product/${handle}`}
                >
                  {`Read More`}
                </Link>
              </div>
              {availableForSale && <AddToBag variant={firstVariant.node} />}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ProductBox
