const Confax = require('../bot.js')

Confax.registerCommand('test', 'dm', (message) => {
  return '**Test successful!**'
}, [], 'Test Command', '[]')
