const getKeyIngredients = productTags => {
  return productTags
    .filter(tag => {
      return tag.includes('Ingredient-')
    })
    .map(tag => {
      return tag.replace('Ingredient-', '').replace('_', ' ')
    })
}

export default getKeyIngredients
