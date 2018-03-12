const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('invite', 'default', (message) => {
  return 'Invite Link: https://discordapp.com/oauth2/authorize?client_id=319545839951544320&permissions=519174&scope=bot'
}, ['invitelink'], 'Get invite link to invite Confax to your server', '[]')
