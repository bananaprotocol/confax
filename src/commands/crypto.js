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
const request = require('request')
const Discord = require('discord.js')
const getSymbolFromCurrency = require('../services/currency')
const { queryFinnhub } = require('../services/finnhub')

Confax.registerCommand('crypto', 'default', (message, bot) => {
  //  Init variables
  const symbols = (message.content.split(' ')).map((x) => x.toUpperCase())
  const fromSymbol = (symbols.shift()).replace(/`/ig, '')
  if (symbols.length === 0) symbols.push('USD')
  CryptoComparePrice(fromSymbol, symbols, message)
}, ['crypt', 'price'], 'Get latest crypto exchange price in USD, or in other cryptos.', '<crypto-currency ticker>')

/**
 * Return the exchange rate for one crypto currency in terms of other currencies.
 * @param  {string} fsym
 * @param  {string[]} tsyms
 * @param  {string} message
 */
const CryptoComparePrice = (fsym, tsyms, message) => {
  //  The API call string.
  const cryptoComparePrice = 'https://min-api.cryptocompare.com/data/price?fsym=' + fsym + '&tsyms=' + tsyms

  request(cryptoComparePrice, (error, response, body) => {
    if (error) {
      return queryFinnhub(message, fsym)
    }
    const embed = new Discord.MessageEmbed().setTitle('cryptocompare.com')
      .setDescription('```MarkDown\n#_Exchange rates for 1 ' + fsym + '```')
      .setURL('https://www.cryptocompare.com/api/')
      .setColor(586901)
      .setTimestamp()
    try {
      const responseBody = JSON.parse(body)
      for (let sym = 0; sym < tsyms.length; sym++) {
        let price = responseBody[tsyms[sym]]
        if (price === undefined) {
          return queryFinnhub(message, fsym)
        } else if (getSymbolFromCurrency(tsyms[sym]) !== undefined) price = ' ' + getSymbolFromCurrency(tsyms[sym]) + ' ' + parseFloat(price).toLocaleString('en-IN', { maximumSignificantDigits: 10, minimumFractionDigits: 2 })
        else price = parseFloat(price).toLocaleString('en-IN', { maximumSignificantDigits: 10, minimumFractionDigits: 2 })
        embed.addField('*  ' + tsyms[sym], '```js\n' + price + '```', true)
      }
      message.channel.send('**' + fsym + '**', {embed})
    } catch (error) {
      return queryFinnhub(message, fsym)
    }
  })
}
