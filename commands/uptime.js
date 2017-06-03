const Discord = require('discord.js')
const Confax = require('../bot.js')

Confax.registerCommand('uptime', 'default', (message, bot) => {
  var now = Date.now()
  var msec = now - bot.readyTime
  var days = Math.floor(msec / 1000 / 60 / 60 / 24)
  msec -= days * 1000 * 60 * 60 * 24
  var hours = Math.floor(msec / 1000 / 60 / 60)
  msec -= hours * 1000 * 60 * 60
  var mins = Math.floor(msec / 1000 / 60)
  msec -= mins * 1000 * 60
  var secs = Math.floor(msec / 1000)
  var timestr = ''
  if (days > 0) {
    timestr += days + 'd '
  }
  if (hours > 0) {
    timestr += hours + 'h '
  }
  if (mins > 0) {
    timestr += mins + 'm '
  }
  if (secs > 0) {
    timestr += secs + 's '
  }
  return '**Uptime:**' + timestr
}, [], 'View the current uptime of Confax', '[]')
