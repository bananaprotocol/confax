const Confax = require('../bot.js')

module.exports =
  spoilerMsg = {
    spoilerMsgContent: '*PSST* long form of bike is bichael',
    spoilerMsgAuthor: 'Yours truly',
    spoilerMsgAttachment: 'none'
  }

Confax.registerCommand('spoiler', 'default', (message, bot) => {
  if (message.content !== '' || message.attachments.size > 0) {
    spoilerMsg.spoilerMsgAuthor = message.author.tag
    spoilerMsg.spoilerMsgContent = message.content
    if (message.attachments.size > 0) {
      // Only first attachment will be added to the spoiler
      spoilerMsg.spoilerMsgAttachment = message.attachments.array()[0].url
    } else {
      spoilerMsg.spoilerMsgAttachment = 'none'
    }
    message.reply("Oof, let's not spoil this to everyone \:wink:")
  } else {
    message.delete()
    return "Do you want me not to spoil silence? \:thinking: The message can't be empty!"
  }
  sendMessageToAuthor(message)
  setTimeout(() => message.delete(), 1000)
}, ['hidemsg', 'spoileralert'], 'Hide specific message content from all users. Message can be read with !readspoiler command', '[message]')

function sendMessageToAuthor (message) {
  let combinedMessage = '**Here is the last spoiler you saved:** ' + spoilerMsg.spoilerMsgContent
  if (spoilerMsg.spoilerMsgAttachment !== 'none') {
    combinedMessage += '\n**Attachment:** ' + spoilerMsg.spoilerMsgAttachment
  }
  message.author.send(combinedMessage)
    .catch((error) => {
      if (error) {
        message.reply('Please enable DMs to receive the message!')
      }
    })
}
