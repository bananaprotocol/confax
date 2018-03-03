const Discord = require('discord.js')
const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config

bot.on('ready', () => {
  bot.user.setActivity('!help to get started.', {type: "PLAYING"})
  bot.user.setStatus('online')
  console.log('Confax is ready to rumble!')
})

bot.on('reconnecting', () => {
  bot.user.setGame('!help to get started.', {type: "PLAYING"})
  bot.user.setStatus('online')
  console.log('Confax has reconnected to Discord.')
})

bot.login(process.env.BOT_TOKEN)
