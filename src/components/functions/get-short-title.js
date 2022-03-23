const getShortTitle = str => {
  const words = str.split(' ').reverse()
  return words.length > 1 ? `${words.pop()} ${words.pop()}` : words.pop()
}
export default getShortTitle
