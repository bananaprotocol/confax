/*  crypto.js @GlassToeStudio - GlassToeStudio@gmail.com

    16 September, 2017
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Return current price of a given crypto-currency in $US

    The following command is uisng a free API from https://www.cryptocompare.com/ (CC BY-NC 3.0)
    The API request can be found here: https://www.cryptocompare.com/api#-api-data-price-

    Usage:
      !price <COIN> (COIN)...

    Example:
      !price BTC ETH

      ------ Current exchange rates for 1 BTC ------
                ETH.......... 14.47

    ------------------------------------------------------------------------

*/
const Confax = require('../bot.js')
const CryptoComparePrice = require('../services/cryptocompare')

Confax.registerCommand('crypto', 'default', (message, bot) => {
  //  Init variables
  const symbols = (message.content.split(' ')).map((x) => x.toUpperCase())
  const fromSymbol = (symbols.shift()).replace(/`/ig, '')
  if (symbols.length === 0) symbols.push('USD')
  CryptoComparePrice(fromSymbol, symbols, message)
}, ['crypt', 'price'], 'Get latest crypto exchange price in USD, or in other cryptos.', '<crypto-currency ticker>')
