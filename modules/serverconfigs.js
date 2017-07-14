const Discord = require('discord.js')
const GlassBot = require('../bot.js')

GlassBot.bot.on('guildCreate', (guild) => {
  var guildID = guild.id
  var path = './GlassBotfiles/' + guildID + '.yml'
  fs.writeFileSync(path, defaultConfig)
  guild.owner.send('Thank you for adding GlassBot to your guild named **' + guild.name + '**.\n\nGlassBot will use the default configuration.')
})

GlassBot.bot.on('guildDelete', (guild) => {
  var guildID = guild.id
  var path = './GlassBotfiles/' + guildID + '.yml'
  try { fs.unlinkSync(path) } catch (error) { console.log('An error occured: ' + error.stack) }
  console.log('Deleted guild config file for ' + guild + '(' + path + ')')
})
