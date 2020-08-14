const Discord = require('discord.js')
const Confax = require('../index.js')

Confax.registerCommand('test', 'dm', (message) => {
  return '**Test successful!**'
}, [], 'Test Command', '[]')
