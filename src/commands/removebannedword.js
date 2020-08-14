const Confax = require('../index.js')
const fs = require('fs')

Confax.registerCommand('removebannedword', 'moderator', (message, bot) => {
  let config = Confax.getConfig(message.guild.id)
  let word = message.content.toLowerCase()
  if (word.length <= 0) {
    return
  }
  if (config.bannedWords.includes(word)) {
    config.bannedWords = config.bannedWords.filter(w => w !== word)
    Confax.setConfig(message.guild.id, config)
    message.reply('**' + word + '**' + ' has been removed from the banned words list.')
    return
  }
  message.reply('**' + word + '**' + ' does not exist in the banned words list.')
  console.log('The banned words list does not contain: ' + word)
}, ['rbw'], 'Remove a word from the banned words list', '[word to remove]')

