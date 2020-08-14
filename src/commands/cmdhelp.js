const Confax = require('../bot.js')

Confax.registerCommand('cmdhelp', 'default', (message, bot) => {
  let helpInfo = ''
  const cmd = message.content.split(' ')[0]
  let realCmd
  let cmdType
  const commands = Confax.commands
  if (!cmd) return 'Please provide a command to get the information from.'
  for (const loopCmdType in commands) {
    for (const loopCmd in commands[loopCmdType]) {
      if (loopCmd === cmd || commands[loopCmdType][loopCmd].aliases.includes(cmd)) {
        realCmd = loopCmd
        cmdType = loopCmdType
        break
      }
    }
  }

  if (realCmd) {
    helpInfo += 'Info on **' + realCmd + '**: ```' +
    '\nCommand: ' + realCmd
    helpInfo += '\nCommand Type: ' + cmdType

    if (commands[cmdType][realCmd].aliases.length > 0) {
      helpInfo += '\nAliases: ' + commands[cmdType][realCmd].aliases.join(', ')
    } else {
      helpInfo += '\nAliases: N/A'
    }

    if (commands[cmdType][realCmd].description) {
      helpInfo += '\nDescription: ' + commands[cmdType][realCmd].description
    } else {
      helpInfo += '\nDescription: N/A'
    }

    if (commands[cmdType][realCmd].usage) {
      helpInfo += '\nUsage: ' + commands[cmdType][realCmd].usage
    } else {
      helpInfo += '\nUsage: N/A'
    }
    helpInfo += '\n```'
  } else {
    helpInfo = 'Command with the name `' + cmd + '` not found.'
  }
  return helpInfo
}, ['cmdinfo'], 'List detailed information about a command', '<command>')
