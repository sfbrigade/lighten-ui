export const matchLowercase = (str, strToMatch) => {
  return str.toLowerCase().match(strToMatch.toLowerCase())
}


export const isObject = (obj) => {
  return obj !== null &&
    !Array.isArray(obj) &&
    typeof obj === 'object'
}
