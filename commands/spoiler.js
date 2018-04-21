const Confax = require('../bot.js')

module.exports = 
  spoilerMsg = {
    spoilerMsgContent: "*PSST* long form of bike is bikael",
    spoilerMsgAuthor: "Yours truly"
}

Confax.registerCommand('spoiler', 'default', (message, bot) => {
  message.delete()
  if (message.content === '') return "Do you want me not to spoil silence? :thinking: The message can't be empty!"
  spoilerMsg.spoilerMsgAuthor = message.author.tag
  spoilerMsg.spoilerMsgContent = message.content
  message.reply("oof, lets not spoil this to everyone ;)")
}, ['hidemsg', 'spoileralert'], 'Hide specific message content from all users. Message can be read with !readspoiler command', '[message]')
