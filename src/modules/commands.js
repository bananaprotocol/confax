const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config
const commands = Confax.commands

bot.on('message', (message) => {
  let cmd = null
  let cmdType = null
  if (message.author.id === config.botID) {
  //  This is the bot speaking
  } else if (message.author.bot) {
  //  This is the bot speaking
  } else if (message.content.indexOf(config.prefix, 0) !== 0) {
  // This is not a command (no prefix)
  } else {
    const userCommand = message.content.split(' ')[0].replace('!', '').toLowerCase()
    for (const loopCmdType in commands) {
      for (const loopCmd in commands[loopCmdType]) {
        if (userCommand.valueOf() === (loopCmd).valueOf()) {
          message.content = message.content.replace(config.prefix + userCommand, '')
          cmd = loopCmd
          cmdType = loopCmdType
          break
        } else {
          const aliases = commands[loopCmdType][loopCmd].aliases
          for (let i = 0; i < aliases.length; i++) {
            const alias = aliases[i]
            if (userCommand.valueOf() === alias.valueOf()) {
              message.content = message.content.replace(config.prefix + userCommand, '')
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
        const accepted = ['Bot Commander', 'Moderator']
        let isMod
        const roles = message.guild.member(message.author.id).roles.cache.array()
        for (let i = 0; i < roles.length; i++) {
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
