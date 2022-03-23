const getWeight = ({ weight, weightUnit }) => {
  switch (weightUnit) {
    case 'GRAMS':
      return `${weight}gr`
    case 'KILOGRAMS':
      return `${weight}kg`
    case 'OUNCES':
      return `${weight}oz`
    case 'POUNDS':
      return `${weight}lb`
    default:
      return `${weight}gms`
  }
}

export default getWeight
