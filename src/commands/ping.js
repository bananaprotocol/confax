const Confax = require('../bot.js')

Confax.registerCommand('ping', 'default', (message, bot) => {
  message.channel.send('Pinging...')
    .then(m => {
      m.edit(`Pong! took \`${m.createdTimestamp - message.createdTimestamp}\`ms`)
    })
}, ['response'], 'Bot Response Test', '[]')
