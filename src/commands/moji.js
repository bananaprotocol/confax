const emojis = require('../core/emojis')
const Confax = require('../bot.js')

Confax.registerCommand('moji', 'default', (message) => {
  const index = Math.floor(Math.random() * (emojis.length)) // Math.random() returns a float from 0 - 1.
  message.channel.send(emojis[index])
}, ['emoji', 'emoticon', 'emote'], 'Get a random emote!', '[]')
