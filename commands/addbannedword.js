const Confax = require('../bot.js')
const fs = require('fs')
let config = Confax.config

Confax.registerCommand('addbannedword', 'moderator', (message, bot) => {
  let word = message.content.toLowerCase()
  if (word.length <= 0) {
    return
  }
  if (config.bannedWords.includes(word)) {
    message.reply('**' + word + '**' + ' already exists in the banned words list.')
    console.log('The banned words list already contains: ' + word)
    return
  }

  config.bannedWords.push(word)
  writeConfig(config)
  message.reply('**' + word + '**' + ' has been added to the banned words list.')
}, ['abw'], 'Add a word to the banned words list', '[word to add]')

function writeConfig (config) {
  fs.writeFileSync('config.json', JSON.stringify(config, null, 4))
}
