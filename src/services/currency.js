const currencySymbolMap = require('../core/map.js')
const getSymbolFromCurrency = (currencyCode) => {
  if (typeof currencyCode !== 'string') return undefined
  var code = currencyCode.toUpperCase()
  if (!currencySymbolMap.hasOwnProperty(code)) return undefined
  return currencySymbolMap[code]
}
module.exports = getSymbolFromCurrency
