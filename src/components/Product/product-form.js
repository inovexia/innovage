import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isEqual, find } from 'lodash'
import ReactHtmlParser from 'html-react-parser'

import getBestForFeature from '~/components/functions/get-best-for-feature'
import getWeight from '~/components/functions/get-weight'
import { StoreContext } from '~/provider'
import GetPrice from '~/components/functions/get-price'

const ProductForm = ({
  product: {
    title,
    descriptionHtml,
    options,
    tags: productTags,
    variants: { edges: variants },
    variants: {
      edges: [initialVariant],
    },
  },
}) => {
  const defaultVariant = initialVariant.node,
    [variant, setVariant] = useState({ ...defaultVariant }),
    { addVariantToCart, addVariantToCartAndBuyNow } = useContext(StoreContext),
    [quantity, setQuantity] = useState(1),
    BestFor = getBestForFeature(productTags),
    weight = getWeight(variant),
    dropQuantity = () => {
      quantity > 1 && setQuantity(quantity - 1)
    },
    raiseQuantity = () => {
      quantity < 10 && setQuantity(quantity + 1)
    },
    handleAddToCart = () => {
      addVariantToCart(variant.id, quantity).then(() => {
        document.querySelector('.bottom-header .toggle-cart').click()
      })
    },
    handleBuyNow = () => {
      addVariantToCartAndBuyNow(variant.id, quantity)
    },
    handleOptionChange = ({ target }, optionI) => {
      const { value } = target,
        currentOptions = [...variant.selectedOptions],
        url = new URL(window.location)

      currentOptions[optionI] = {
        ...currentOptions[optionI],
        value,
      }

      const newVariant = find(variants, ({ node: { selectedOptions } }) => {
        return isEqual(currentOptions, selectedOptions)
      })

      setVariant(newVariant.node)
      newVariant.node.selectedOptions.forEach(({ name, value }) => {
        url.searchParams.set(name.toLowerCase(), value)
      })
      window.history.pushState({}, '', url)
    }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search),
        denominations = decodeURIComponent(params.get('denominations'))
      if (denominations) {
        const newVar = find(variants, ({ node: { selectedOptions } }) => {
          return find(selectedOptions, ({ name, value }) => {
            return (
              name === 'Denominations' &&
              value.toLowerCase() ===
                denominations.split('-').join(' ').toLowerCase()
            )
          })
        })
        newVar && setVariant(newVar.node)
      }
    }
  }, [variants])

  // ? just to get rid of warnings
  false && handleBuyNow()

  return (
    <div className={'product-form'}>
      <h1 className={'title'}>{title}</h1>
      <div className={'prices'}>
        <h3 className={'our-price'}>{GetPrice(variant.priceV2.amount)}</h3>
        {variant.compareAtPriceV2 && (
          <h4 className={'retail-price'}>
            {GetPrice(variant.compareAtPriceV2.amount)}
          </h4>
        )}
      </div>
      <div className={'description'}>
        {ReactHtmlParser(
          descriptionHtml.replace(/\n|\t/g, '').replace('> <', '><')
        )}
        <div className={'additional-info'}>
          <div className={'info-block'}>
            <strong>This product is organic, vegan & natural.</strong>
          </div>
          <div className={'info-block'}>
            {BestFor !== '' && (
              <div className={'info-inline'}>
                <span>Best for: </span>
                <strong>{BestFor}</strong>
              </div>
            )}
            {weight !== '' && (
              <div className={'info-inline'}>
                <span>Weight: </span>
                <strong>{weight}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={'form-wrapper'}>
        {options.length > 0 && (
          <div className={'variant-types'}>
            {options.map(
              ({ id, name, values }, i) =>
                values.length > 1 && (
                  <div className={'type mb-4'} key={id.toString()}>
                    <h4>
                      <span>{`${name}: `}</span>
                      <strong>
                        {ReactHtmlParser(variant.selectedOptions[i].value)}
                      </strong>
                    </h4>
                    {values.map((value, j) => (
                      <button
                        key={j}
                        type={'button'}
                        onClick={event => handleOptionChange(event, i)}
                        value={value}
                        className={`btn btn-sm btn-demo-primary me-3${
                          value === variant.selectedOptions[i].value
                            ? ' active'
                            : ''
                        }`}
                      >
                        {ReactHtmlParser(value)}
                      </button>
                    ))}
                  </div>
                )
            )}
          </div>
        )}
        <div className={'add-to-cart'}>
          <div className={'flex-grow-1 my-auto'}>
            <div className={'d-flex'}>
              <div className={'flex-shrink-1 my-auto'}>
                <div className={'quantity-selector'}>
                  <button
                    type={'button'}
                    className={'btn-quantity minus'}
                    aria-label={'Quantity Minus'}
                    onClick={dropQuantity}
                  />
                  <span className={'quantity-value'}>{quantity}</span>
                  <button
                    type={'button'}
                    className={'btn-quantity plus'}
                    aria-label={'Quantity Plus'}
                    onClick={raiseQuantity}
                  />
                </div>
              </div>
              <div className={'flex-grow-1 my-auto'}>
                <button
                  type={'button'}
                  onClick={handleAddToCart}
                  className={'btn btn-demo-primary w-100'}
                >
                  <span>Add To Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            altText: PropTypes.string,
            localImage: PropTypes.shape,
            url: PropTypes.string,
          }),
        })
      ),
    }),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          availableForSale: PropTypes.bool,
          id: PropTypes.string,
          price: PropTypes.string,
          title: PropTypes.string,
          shopifyId: PropTypes.string,
          selectedOptions: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              value: PropTypes.string,
            })
          ),
        })
      ),
    }),
  }),
}

export default ProductForm
