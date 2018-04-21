const Confax = require('../bot.js')
const spoilerMsg = require('./spoiler.js')

Confax.registerCommand('readspoiler', 'default', (message, bot) => {
  message.react("👍")
  let combinedMessage = '**Originally posted by** ' + spoilerMsg.spoilerMsgAuthor + '\n**Content:** ' + spoilerMsg.spoilerMsgContent
  message.author.send(combinedMessage)
}, ['tellmethesecret', 'sendmemsg'], 'Read latest spoiler (content will be sent via DMs)', '')
