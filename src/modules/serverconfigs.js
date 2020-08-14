const Confax = require('../index.js')
const fs = require('fs')

Confax.bot.on('guildCreate', (guild) => {
  let guildID = guild.id
  let path = './guilds/' + guildID + '.json'
  fs.writeFileSync(path, JSON.stringify(Confax.config, null, 2))
  guild.owner.send('Thank you for adding Confax to your guild named **' + guild.name + '**.\n\nConfax will use the default configuration.')
})

Confax.bot.on('guildDelete', (guild) => {
  let guildID = guild.id
  let path = './guilds/' + guildID + '.json'
  try { fs.unlinkSync(path) } catch (error) { console.log('An error occured: ' + error.stack) }
  console.log('Deleted guild config file for ' + guild + '(' + path + ')')
})
