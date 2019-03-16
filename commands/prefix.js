const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('prefix', 'default', (message) => {
  return '**Prefix has been changed!**'
}, ['setprefix', 'changeprefix'], 'Changes the custom guild prefix.', '[]')
