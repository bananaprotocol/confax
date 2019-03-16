const Confax = require('../bot.js')
const bot = Confax.bot
const config = Confax.config
const commands = Confax.commands

bot.on('message', (message) => {
  bot.prefix = config.prefix;
  let fetched = bot.prefixes.get(message.guild.id);
  if (bot.prefixes.has(message.guild.id)) bot.prefix = fetched;
  else bot.prefix = config.prefix;
  let cmd = null
  let cmdType = null
  if (message.author.id === config.botID) {
  //  This is the bot speaking
  } else if (message.author.bot) {
  //  This is the bot speaking
  } else if (message.content.indexOf(bot.prefix, 0) !== 0) {
  // This is not a command (no prefix)
  } else {
    let userCommand = message.content.split(' ')[0].replace('!', '').toLowerCase()
    for (let loopCmdType in commands) {
      for (let loopCmd in commands[loopCmdType]) {
        if (userCommand.valueOf() === (loopCmd).valueOf()) {
          message.content = message.content.replace(bot.prefix + userCommand, '')
          cmd = loopCmd
          cmdType = loopCmdType
          break
        } else {
          let aliases = commands[loopCmdType][loopCmd].aliases
          for (let i = 0; i < aliases.length; i++) {
            let alias = aliases[i]
            if (userCommand.valueOf() === alias.valueOf()) {
              message.content = message.content.replace(bot.prefix + userCommand, '')
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
