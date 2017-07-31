const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('eval', 'master', (message, bot) => {
  try {
    let output = eval(message.content)
    debugger
    if (!output.includes(bot.token)) {
      return '**Output:** ' + output
    } else {
      return '**Output:** ' + 'Why-Token-Please-No'
    }
  } catch (error) {
    return '**Error:** ```' + error + '```'
  }
}, [], 'Execute code', '<code>')
