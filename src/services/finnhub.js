const request = require('request')
const Discord = require('discord.js')
const getSymbolFromCurrency = require('./currency')
const apiKey = process.env.FINNHUB_API_KEY

module.exports = {
  queryFinnhub: (message, stock) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${apiKey}`
    return request(url, (error, response, body) => {
      if (error) {
        message.channel.send(`Error while retrieving stock information ${error.message}`)
        return
      }
      if (response.status === 429) {
        message.channel.send('API Limit reached')
        return
      }
      try {
        const data = JSON.parse(body)
        const embed = makeUpMessage(data, stock)
        message.channel.send(embed)
      } catch (error) {
        message.channel.send(`Error while retrieving stock information ${error.message}`)
      }
    })
  }
}

const makeUpMessage = (data, stock, currency = 'USD') => {
  let line = ''
  let suggestion = ''
  if (data.c) {
    line = `${getSymbolFromCurrency(currency)}` + ` ${data.c}`
  } else {
    line = '¯\\_(ツ)_/¯'
    suggestion = 'try !price ' + stock
  }
  const embed = new Discord.MessageEmbed({
    title: 'finnhub.io',
    description: '```MarkDown\n' + `#_Exchange rates for 1 ${stock}` + '```'
  })
  embed.setTimestamp()
  embed.setURL('https://www.finnhub.io')
  embed.setColor(586901)
  embed.addField(`*** ${currency} **`, '```js\n' + line + '```', true)
  if (suggestion.length > 0) {
    embed.setFooter(suggestion)
  }
  return embed
}
