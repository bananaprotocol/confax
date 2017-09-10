/*  crypto.js by David Jerome @GlassToeStudio - GlassToeStudio@gmail.com

    9 September, 2017
    https://github.com/GlassToeStudio
    http://glasstoestudio.weebly.com/
    https://twitter.com/GlassToeStudio

    ------------------------------------------------------------------------
    Return current price of a given crypto-currency in $US
*/
const GlassBot = require('../bot.js')
const request = require('request')

GlassBot.registerCommand('crypto', 'default', (message, bot) => {
  let address = 'http://www.coincap.io/page/' + message.content.toUpperCase()
  request(address, function (error, response, body) {
    if (error) {
      //  error is always null, but put this here for jstandard: (Expected error to be handled.)
      message.channel.send('Not a valied crypto currency, try BTC.')
      return
    }
    try {
      let btcBody = JSON.parse(body)
      let str = btcBody.price_usd.toString()
      let price = str.slice(0, str.indexOf('.') + 3)
      message.channel.send('The current price for 1 **' + message.content.toUpperCase() + '** is $**' + price + '** USD.').catch(err => console.log(err.stack))
    } catch (error) {
      message.channel.send('<:doggo:328259712963313665>' + ' Not a valid crypto-currency, try BTC or ETH.')
    }
  })
}, ['crypt', 'price'], 'Get latest crypto currency price.', '[]')
