const Confax = require('../bot.js')
const spoilerMsg = require('./spoiler.js')

Confax.registerCommand('readspoiler', 'default', (message, bot) => {
  let combinedMessage = '**Originally posted by** ' + spoilerMsg.spoilerMsgAuthor + '\n**Content:** ' + spoilerMsg.spoilerMsgContent
  if(spoilerMsg.spoilerMsgAttachment !== "none"){
    combinedMessage += "\n**Attachment:** " + spoilerMsg.spoilerMsgAttachment
  }
  message.author.send(combinedMessage).then(() => {message.react("👍")})
    .catch((error) => {
      message.reply("Please enable DMs to receive the message!")
      message.react("😞")
    })
}, ['tellmethesecret', 'sendmemsg'], 'Read latest spoiler (content will be sent via DMs)', '')
