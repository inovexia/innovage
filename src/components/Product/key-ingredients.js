import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import KeyIngredientsData from '~/components/constants/components/key-ingredients-data'
import getKeyIngredients from '~/components/functions/get-key-ingredients'

const KeyIngredients = ({ product: { tags: productTags } }) => {
  const { essential_oil, jojoba_oil, glycerin } = KeyIngredientsData(),
    Ingredients = getKeyIngredients(productTags)

  return (
    Ingredients &&
    Ingredients.length > 0 && (
      <div className={'key-ingredients'}>
        <h5 className={'title'}>KEY INGREDIENTS</h5>
        <div className={'ingredients'}>
          {Ingredients.map((name, index) => (
            <div className={'ingredient'} key={index}>
              <div className={'col-3'}>
                <div className={'image'}>
                  {(name => {
                    switch (name) {
                      case 'Essential Oil':
                        return (
                          <GatsbyImage
                            image={
                              essential_oil.childImageSharp.gatsbyImageData
                            }
                            alt={`essential_oil`}
                          />
                        )
                      case 'Jojoba Oil':
                        return (
                          <GatsbyImage
                            image={jojoba_oil.childImageSharp.gatsbyImageData}
                            alt={`jojoba_oil`}
                          />
                        )
                      case 'Glycerin':
                        return (
                          <GatsbyImage
                            image={glycerin.childImageSharp.gatsbyImageData}
                            alt={`glycerin`}
                          />
                        )
                      default:
                        return null
                    }
                  })(name)}
                </div>
              </div>
              <div className={'col'}>
                <div className={'name'}>{name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )
}
export default KeyIngredients
