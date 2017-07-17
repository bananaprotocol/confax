const Discord = require('discord.js')
const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config
const commands = Confax.commands

bot.on('message', (message) => {
  var cmd
  var cmdType
  if (message.author.id === config.botID) {

  } else if (message.author.bot) {

  } else {
    for (var loopCmdType in commands) {
      for (var loopCmd in commands[loopCmdType]) {
        if (message.content.toLowerCase().lastIndexOf(config.prefix + loopCmd, 0) === 0 || message.content.toLowerCase().lastIndexOf(loopCmd + config.suffix, 0) === 0) {
          message.content = message.content.replace(config.prefix + loopCmd, '')
          message.content = message.content.replace(loopCmd + config.suffix, '')
          cmd = loopCmd
          cmdType = loopCmdType
          break
        } else {
          var aliases = commands[loopCmdType][loopCmd].aliases
          for (var i = 0; i < aliases.length; i++) {
            var alias = aliases[i]
            if (message.content.toLowerCase().lastIndexOf(config.prefix + alias, 0) === 0 || message.content.toLowerCase().lastIndexOf(alias + config.suffix, 0) === 0) {
              message.content = message.content.replace(config.prefix + alias, '')
              message.content = message.content.replace(alias + config.suffix, '')
              cmd = loopCmd
              cmdType = loopCmdType
              break
            }
          }
        }
      }
    }
    message.content = message.content.indexOf(' ') === 0 ? message.content.substring(1) : message.content
    if (cmd !== null) {
      if (cmdType === 'master') {
        if (!(config.masters).includes(message.author.id)) {
          message.reply("You don't have enough permissions to execute this command.")
          return
        }
      } else if (cmdType === 'moderator') {
        var accepted = ['Bot Commander', 'Moderator']
        var isMod
        var roles = message.guild.member(message.author.id).roles.array()
        for (var i = 0; i < roles.length; i++) {
          if (accepted.includes(roles[i].name)) {
            isMod = true
            break
          }
        }
        if (!isMod) {
          message.reply("You don't have enough permissions to execute this command.")
          return
        }
      } else if (cmdType === 'dm') {
        if (message.channel.type === 'dm') {
          console.log(message.author.username + ' - ' + message.content)
        } else {
          return
        }
      }
      try {
        var result = commands[cmdType][cmd].process(message, bot)
      } catch (error) {
        console.log('An Error occured: ' + error.stack)
      }
      if (result) {
        if (cmdType === 'dm') {
          message.author.send(result)
        } else {
          message.reply(result)
        }
      }
    }
  }
})
