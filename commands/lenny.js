const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('lenny', 'default', (message, bot) => {  
  message.channel.send('( ͡° ͜ʖ ͡°)')
}, ['lenny'], 'its lenny ffs', '["!lenny"]')
