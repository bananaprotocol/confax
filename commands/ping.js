const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('ping', 'default', (message, bot) => {
  var time = Date.now()
  message.channel.send('Pong!').then(m => m.edit('Pong! `took ' + (Date.now() - time) + 'ms`'))
}, ['response'], 'Bot Response Test', '[]')
