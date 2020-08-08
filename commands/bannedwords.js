const Confax = require('../bot.js')

Confax.registerCommand('bannedwords', 'default', (message, bot) => {
  message.channel.send(message.member.user + ' the banned words: ' + Confax.getConfig(message.guild.id).bannedWords.toString())
}, [], 'Show banned words list', '<mention>')
