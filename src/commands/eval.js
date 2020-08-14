const Confax = require('../bot.js')

Confax.registerCommand('eval', 'master', (message, bot) => {
  try {
    const output = eval(message.content)
    if (!message.content.includes('bot.token') || !output.includes(bot.token)) {
      return '**Output:** ' + output
    } else {
      return '**Output:** ' + 'Why-Token-Please-No'
    }
  } catch (error) {
    return '**Error:** ```' + error + '```'
  }
}, [], 'Execute code', '<code>')
