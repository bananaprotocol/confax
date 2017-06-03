const Discord = require('discord.js')
const Confax = require('../bot.js')
const config = require('../config.json')

Confax.registerCommand('advancedhelp', 'default', (message, bot) => {
  var helpMsg = ''
  var commands = Confax.commands

  for (var loopCmdType in commands) {
    helpMsg += '**~~------~~** __' + loopCmdType.toUpperCase() + ' COMMANDS__ **~~------~~**'
    for (var loopCmd in commands[loopCmdType]) {
      helpMsg += '```\nCommand: ' + loopCmd

      if (commands[loopCmdType][loopCmd].aliases.length > 0) {
        helpMsg += '\nAliases: ' + commands[loopCmdType][loopCmd].aliases.join(', ')
      } else {
        helpMsg += '\nAliases: N/A'
      }

      if (commands[loopCmdType][loopCmd].description) {
        helpMsg += '\nDescription: ' + commands[loopCmdType][loopCmd].description
      } else {
        helpMsg += '\nDescription: N/A'
      }

      if (commands[loopCmdType][loopCmd].usage) {
        helpMsg += '\nUsage: ' + commands[loopCmdType][loopCmd].usage 
      } else {
        helpMsg += '\nUsage: N/A'
      }

      helpMsg += '\n```'
    }
  }

  message.author.send('**Advanced Help**\n\n' + 
  'All commands are prefixed with: `' + config.prefix + '` and suffixed with: `' + config.suffix + '`\n\n' +
  helpMsg, { split: true })
  return 'I sent you the advanced help list as a DM!'
}, [], 'List advanced information about every registered command', '[]')
