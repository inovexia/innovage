import React from 'react'
import { Link } from 'gatsby'

import AddToBag from '~/components/AddToBag'
import Offer from '~/components/icons/offer'
import onSale from '~/components/functions/on-sale'
import GetPrice from '~/components/functions/get-price'
import getShortTitle from '~/components/functions/get-short-title'

const RelatedProductBox = ({
  product: {
    availableForSale,
    handle,
    images: {
      edges: [firstImage],
    },
    tags,
    title,
    variants: {
      edges: [firstVariant],
    },
  },
}) => {
  const {
    node: {
      priceV2: { amount: productPrice },
    },
  } = firstVariant

  return (
    <div className={'box'}>
      <div className={'product'}>
        {onSale(tags) && (
          <div className={'offer-wrap'}>
            <div className={'offer'}>
              <Offer with={156} height={157} />
              <div className={'offer-text'}>Sale</div>
            </div>
          </div>
        )}
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
          <div className={'learn-more'}>
            <Link className={'btn btn-demo-primary'} to={`/product/${handle}`}>
              {`See ${getShortTitle(title)}`}
            </Link>
          </div>
          {availableForSale && <AddToBag variant={firstVariant.node} />}
        </div>
      </div>
    </div>
  )
}

export default RelatedProductBox
