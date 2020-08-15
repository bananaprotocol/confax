const Discord = require('discord.js')
const getSymbolFromCurrency = require('./currency')
const request = require('request')

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
    const suggestion = 'try !stock ' + fsym
    const shrug = '¯\\_(ツ)_/¯'
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
          price = shrug
          embed.setFooter(suggestion)
        } else if (getSymbolFromCurrency(tsyms[sym]) !== undefined) {
          price = ' ' + getSymbolFromCurrency(tsyms[sym]) + ' ' + parseFloat(price).toLocaleString('en-IN', {
            maximumSignificantDigits: 10,
            minimumFractionDigits: 2
          })
        } else {
          price = parseFloat(price).toLocaleString('en-IN', {
            maximumSignificantDigits: 10,
            minimumFractionDigits: 2
          })
        }
        embed.addField('*  ' + tsyms[sym], '```js\n' + price + '```', true)
      }
      message.channel.send('**' + fsym + '**', { embed })
    } catch (error) {
      console.log(error.message)
    }
  })
}

module.exports = CryptoComparePrice
