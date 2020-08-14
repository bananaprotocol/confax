const Confax = require('../bot.js')

Confax.registerCommand('kick', 'moderator', (message, bot) => {
  const mention = message.mentions.users.array()[0]
  const kickPerms = message.guild.member(bot.user).hasPermission('KICK_MEMBERS')
  if (mention === null) {
    return 'Please mention a user, that you would like to kick.'
  } else {
    if (!kickPerms) {
      return "Confax doesn't have enough permissions to kick any user."
    } else {
      const kickable = message.guild.member(mention).kickable
      if (!kickable) {
        return mention + " isn't kickable."
      } else {
        message.guild.member(mention).kick()
        return mention + ' has been kicked.'
      }
    }
  }
}, [], 'Kick a user from the server', '<mention>')
