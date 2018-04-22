const Confax = require('../bot.js')

module.exports = 
  spoilerMsg = {
    spoilerMsgContent: '*PSST* long form of bike is bikael',
    spoilerMsgAuthor: 'Yours truly',
    spoilerMsgAttachment: 'none'
}

Confax.registerCommand('spoiler', 'default', (message, bot) => {
  message.delete()
  if (message.content !== '' || message.attachments.size > 0){
    spoilerMsg.spoilerMsgAuthor = message.author.tag
    spoilerMsg.spoilerMsgContent = message.content
    if(message.attachments.size > 0){
      // Only first attachment will be added to the spoiler
      spoilerMsg.spoilerMsgAttachment = message.attachments.array()[0].url
    }
    else{
      spoilerMsg.spoilerMsgAttachment = 'none'
    }
    message.reply('oof, lets not spoil this to everyone ;)')
  }
  else {
    return "Do you want me not to spoil silence? :thinking: The message can't be empty!"
  }
}, ['hidemsg', 'spoileralert'], 'Hide specific message content from all users. Message can be read with !readspoiler command', '[message]')
