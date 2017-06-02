const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.bot.on('guildCreate', (guild) => {
  var guildID = guild.id
  var path = './confaxfiles/' + guildID + '.yml'
  fs.writeFileSync(path, defaultConfig)
  guild.owner.send('Thank you for adding Confax to your guild named **' + guild.name + '**.\n\nConfax will use the default configuration.')
})

Confax.bot.on('guildDelete', (guild) => {
  var guildID = guild.id
  var path = './confaxfiles/' + guildID + '.yml'
  try { fs.unlinkSync(path) } catch (error) { console.log('An error occured: ' + error.stack) }
  console.log('Deleted guild config file for ' + guild + '(' + path + ')')
})