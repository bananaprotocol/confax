const Confax = require('../bot.js')

module.exports = 
  spoilerMsg = {
    spoilerMsgContent: "",
    spoilerMsgAuthor: ""
}

Confax.registerCommand('spoiler', 'default', (message, bot) => {
  message.delete()
  if (message.content === '') return "Do you want me not to spoil silence? :thinking: The message can't be empty!"
  spoilerMsg.spoilerMsgAuthor = message.author.tag
  spoilerMsg.spoilerMsgContent = message.content
}, ['hidemsg', 'spoileralert'], 'Hide specific message content from all users. Message can be read with !readspoiler command', '[message]')
