const Discord = require('discord.js')
const GlassBot = require('../bot.js')
const bot = GlassBot.bot
const config = GlassBot.config

bot.on('ready', () => {
  bot.user.setGame('Hey, format code pls.')
  bot.user.setStatus('online')
  console.log('GlassBot seeks bad code!')
})

bot.on('reconnecting', () => {
  bot.user.setGame('Hey, format code pls.')
  bot.user.setStatus('online')
  console.log('GlassBot seeks bad code.. again.')
})

bot.login(process.env.BOT_TOKEN)
