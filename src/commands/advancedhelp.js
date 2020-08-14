const Confax = require('../index.js')

Confax.registerCommand('advancedhelp', 'default', (message, bot) => {
  const config = Confax.getConfig(message.guild.id)
  let helpMsg = '**Advanced Help**\n\n' +
  'All commands are prefixed with: `' + config.prefix + '`\n\n'

  const commands = Confax.commands

  for (const loopCmdType in commands) {
    helpMsg += '**~~------~~** __' + loopCmdType.toUpperCase() + ' COMMANDS__ **~~------~~**'
    for (const loopCmd in commands[loopCmdType]) {
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
      if (helpMsg.length >= 1900) {
        message.author.send(helpMsg)
        helpMsg = ''
      }
    }
  }

  message.author.send(helpMsg, { split: true })
  return 'I sent you the advanced help list as a DM!'
}, [], 'List advanced information about every registered command', '[]')
