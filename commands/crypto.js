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
const GlassBot = require('../bot.js')
const request = require('request')
const Discord = require('discord.js')
const currencySymbolMap = require('../map')

GlassBot.registerCommand('crypto', 'default', (message, bot) => {
  //  Init variables
  let symbols = (message.content.split(' ')).map(function (x) { return x.toUpperCase() })
  let fromSymbol = (symbols.shift()).replace('`', '')
  if (symbols.length === 0) symbols.push('USD')
  CrytpoComparePrice(fromSymbol, symbols, message)
}, ['crypt', 'price'], 'Get latest crypto exchange price in USD, or in other cryptos.', '<crypto-currency ticker> (crypto-currency ticker )')

/**
 * Return the exchange rate for one crypto currency in terms of other currencies.
 * @param  {string} fsym
 * @param  {string[]} tsyms
 * @param  {string} messge
 */
function CrytpoComparePrice (fsym, tsyms, message) {
  //  The API call string.
  let cryptoComparePrice = 'https://min-api.cryptocompare.com/data/price?fsym=' + fsym + '&tsyms=' + tsyms

  request(cryptoComparePrice, function (error, response, body) {
    if (error) message.channel.send('Not a valid crypto currency, try BTC or ETH.')
    let embed = new Discord.RichEmbed().setTitle('cryptocompare.com')
      .setDescription('```MarkDown\n#_Exchange rates for 1 ' + fsym + '```')
      .setURL('https://www.cryptocompare.com/api/')
      .setColor(586901)
      .setTimestamp()
    try {
      let responseBody = JSON.parse(body)
      for (let sym = 0; sym < tsyms.length; sym++) {
        let price = responseBody[tsyms[sym]]
        if (price === undefined) price = '¯\\_(ツ)_/¯' // Not valid crypto currency ¯\_(ツ)_/¯
        else if (getSymbolFromCurrency(tsyms[sym]) !== undefined) price = ' ' + getSymbolFromCurrency(tsyms[sym]) + ' ' + parseFloat(price).toLocaleString('en-IN', { maximumSignificantDigits: 10, minimumFractionDigits: 2 })
        else price = parseFloat(price).toLocaleString('en-IN', { maximumSignificantDigits: 10, minimumFractionDigits: 2 })
        embed.addField('*  ' + tsyms[sym], '```js\n' + price + '```', true)
      }
      message.channel.send('**' + fsym + '**', {embed})
    } catch (error) {
      message.channel.send('<:doggo:328259712963313665>' + ' Not a valid crypto-currency, try BTC or ETH.')
    }
  })
}

function getSymbolFromCurrency (currencyCode) {
  if (typeof currencyCode !== 'string') return undefined
  var code = currencyCode.toUpperCase()
  if (!currencySymbolMap.hasOwnProperty(code)) return undefined
  return currencySymbolMap[code]
}
