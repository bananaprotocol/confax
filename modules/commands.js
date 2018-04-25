const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config
const commands = Confax.commands

bot.on('message', (message) => {
  let hasArgs
  let cmd = null
  let cmdType = null
  if (message.author.id === config.botID) {
  //  This is the bot speaking
  } else if (message.author.bot) {
  //  This is the bot speaking
  } else if (message.content.lastIndexOf(config.prefix, 0) === 0) {
    let commandUsed = message.content.split(' ')[0].replace('!', '')
    let testCommand = '!' + commandUsed.toLowerCase()
    for (let loopCmdType in commands) {
      for (let loopCmd in commands[loopCmdType]) {
        if (testCommand.valueOf() === (config.prefix + loopCmd).valueOf()) {
          message.content = message.content.replace(config.prefix + commandUsed, '')
          message.content = message.content.replace(commandUsed + config.suffix, '')
          cmd = loopCmd
          cmdType = loopCmdType
          break
        } else {
          let aliases = commands[loopCmdType][loopCmd].aliases
          for (let i = 0; i < aliases.length; i++) {
            let alias = aliases[i]
            if (testCommand.valueOf() === (config.prefix + alias, 0).valueOf() || testCommand.lastIndexOf(alias + config.suffix, 0) === 0) {
              message.content = message.content.replace(config.prefix + commandUsed, '')
              message.content = message.content.replace(commandUsed + config.suffix, '')
              cmd = loopCmd
              cmdType = loopCmdType
              break
            }
          }
        }
      }
    }
    if (message.content.indexOf(' ') === 0) { hasArgs = true }
    message.content = message.content.indexOf(' ') === 0 ? message.content.substring(1) : message.content
    if (cmd !== null) {
      if (cmdType === 'master') {
        if (!(config.masters).includes(message.author.id)) {
          message.reply("You don't have enough permissions to execute this command.")
          return
        }
      } else if (cmdType === 'moderator') {
        let accepted = ['Bot Commander', 'Moderator']
        let isMod
        let roles = message.guild.member(message.author.id).roles.array()
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
        if (hasArgs || !message.content.length > 0) {
          var result = commands[cmdType][cmd].process(message, bot)
        }
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
