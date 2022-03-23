const getBestForFeature = productTags => {
  return productTags
    .filter(tag => {
      return tag.includes('BestFor-')
    })
    .map(tag => {
      return tag.replace('BestFor-', '')
    })
    .reverse()
    .join(', ')
}

export default getBestForFeature
