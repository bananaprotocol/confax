const Confax = require('../bot.js')

Confax.registerCommand('speak', 'moderator', (message, bot) => {
  let myMention = message.mentions.users.array()[0]
  let myChannel = message.mentions.channels.array()[0]
  let deleteMessage = message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')
  if (myChannel === undefined) {
    if (deleteMessage) message.delete()
    return ('Please mention a #channel so I know where to speak!')
  }

  let msg = message.content.replace(myChannel.id, '').replace('<#>', '')
  let channel = message.guild.channels.find('name', myChannel.name)

  if (myMention !== undefined) {
    msg = msg.replace(myMention.id, '').replace('<@>', '')
  } else { myMention = '' }

  if (deleteMessage) message.delete()
  channel.send(myMention + msg)
}, ['talk', 'say'], 'Make the bot speak to a given channel', '[to channel] <to member> [message]')
