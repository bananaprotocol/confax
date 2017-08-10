const Discord = require('discord.js')
const Confax = require('../bot.js')
const config = require('../config.json')

Confax.registerCommand('help', 'default', (message, bot) => {
  let commands = Confax.commands
  let cmds = {
    master: [],
    moderator: [],
    default: [],
    dm: []
  }

  for (let loopCmdType in commands) {
    for (let loopCmd in commands[loopCmdType]) {
      cmds[loopCmdType].push(loopCmd)
      let aliases = commands[loopCmdType][loopCmd].aliases
      for (let i = 0; i < aliases.length; i++) {
        let alias = aliases[i]
        cmds[loopCmdType].push(alias)
      }
    }
  }

  for (let loopCmdType in cmds) { cmds[loopCmdType].sort() }

  let mastercmds = Object.keys(cmds['master']).length
  let modcmds = Object.keys(cmds['moderator']).length
  let defaultcmds = Object.keys(cmds['default']).length
  let dmcmds = Object.keys(cmds['dm']).length

  return '\n\nDefault Commands **(' + defaultcmds + ')** `' + cmds['default'].join('`**,** `') +
  '`\nDM Commands **(' + dmcmds + ')** `' + cmds['dm'].join('`**,** `') +
  '`\nModerator Commands **(' + modcmds + ')** `' + cmds['moderator'].join('`**,** `') +
  '\nMaster Commands **(' + mastercmds + ')** `' + cmds['master'].join('`**,** `') +
  '\nAll Commands - **' + (defaultcmds + dmcmds + modcmds + mastercmds) + '**' +
  '\nUse `advancedhelp` to get an advanced list of all commands or `cmdhelp` to get a detailed description of one.'
}, ['cmds', 'commands', 'commandlist'], 'List all commands', '[]')
