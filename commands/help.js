const Confax = require('../bot.js')

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
    }
  }

  for (let loopCmdType in cmds) { cmds[loopCmdType].sort() }

  let mastercmds = Object.keys(cmds['master']).length
  let modcmds = Object.keys(cmds['moderator']).length
  let defaultcmds = Object.keys(cmds['default']).length
  let dmcmds = Object.keys(cmds['dm']).length

  let helpList = '\n'
  if (defaultcmds > 0) helpList += 'Default Commands **(' + defaultcmds + ')** ```' + cmds['default'].join(' \n') + ' ```\n'
  if (dmcmds > 0) helpList += 'DM Commands **(' + dmcmds + ')** ```' + cmds['dm'].join('-\n') + ' ```\n'
  if (modcmds > 0) helpList += 'Moderator Commands **(' + modcmds + ')** ```' + cmds['moderator'].join(' \n') + ' ```\n'
  if (mastercmds > 0) helpList += 'Master Commands **(' + mastercmds + ')** ```' + cmds['master'].join(' \n') + ' ```\n'
  helpList += 'All Commands - **(' + (defaultcmds + dmcmds + modcmds + mastercmds) + ')**' +
  '```Use advancedhelp to get an advanced list of all commands or cmdhelp to get a detailed description of one. ```'
  return helpList
}, ['cmds', 'commands', 'commandlist'], 'List all commands', '[]')
