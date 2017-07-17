const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('eval', 'master', (message, bot) => {
  try {
    var output = eval(message.content)
    return '**Output:** ' + output
  } catch (error) {
    return '**Error:** ```' + error + '```'
  }
}, [], 'Execute code', '<code>')
