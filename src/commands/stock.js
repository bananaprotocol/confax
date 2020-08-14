const Confax = require('../bot.js')
const { queryFinnhub } = require('../services/finnhub')

Confax.registerCommand('stock', 'default', (message) => {
  const symbols = message.content.split(' ').map((s) => s.toUpperCase())
  if (symbols.length === 0 || symbols[0] === '') {
    message.channel.send('Please provide a search term')
    return
  }

  queryFinnhub(message, symbols[0])
}, ['stock'], 'Get latest stock exchange price in USD.', '<mention>')
