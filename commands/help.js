const Discord = require('discord.js')
const Confax = require('../bot.js')
const config = require('../config.json')

Confax.registerCommand('help', 'default', (message, bot) => {
  var commands = Confax.commands
  var cmds = {
    master: [],
    moderator: [],
    default: [],
    dm: []
  }

  for (var loopCmdType in commands) {
    for (var loopCmd in commands[loopCmdType]) {
      cmds[loopCmdType].push(loopCmd)
      var aliases = commands[loopCmdType][loopCmd].aliases
      for (var i = 0; i < aliases.length; i++) {
        var alias = aliases[i]
        cmds[loopCmdType].push(alias)
      }
    }
  }

  for (var loopCmdType in cmds) { cmds[loopCmdType].sort() }

  var mastercmds = Object.keys(cmds['master']).length
  var modcmds = Object.keys(cmds['moderator']).length
  var defaultcmds = Object.keys(cmds['default']).length
  var dmcmds = Object.keys(cmds['dm']).length

  return '\n\nDefault Commands **(' + defaultcmds + ')** `' + cmds['default'].join('`**,** `') +
  '`\nDM Commands **(' + dmcmds + ')** `' + cmds['dm'].join('`**,** `') +
  '`\nModerator Commands **(' + modcmds + ')** `' + cmds['moderator'].join('`**,** `') +
  '\nMaster Commands **(' + mastercmds + ')** `' + cmds['master'].join('`**,** `') +
  '\nAll Commands - **' + (defaultcmds + dmcmds + modcmds + mastercmds) + '**' +
  '\nUse `advancedhelp` to get an advanced list of all commands or `cmdhelp` to get a detailed description of one.'
}, ['cmds', 'commands', 'commandlist'], 'List all commands', '[]')
