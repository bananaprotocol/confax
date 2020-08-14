const Confax = require('../bot.js')
const fs = require('fs')
const bot = Confax.bot
const warnedUserIds = Confax.warnedUserIds

bot.on('message', (message) => {
  const config = Confax.getConfig(message.guild.id)
  const bannedWords = config.bannedWords

  if (message.author.bot) return

  const lowercaseMessage = message.content.toLowerCase()
  for (var word in bannedWords) {
    if (lowercaseMessage.split(' ').indexOf(bannedWords[word]) > -1) {
      const apiCommands = ['addbannedword', 'abw', 'removebannedword', 'rbw']
      if (apiCommands.some(x => { return lowercaseMessage.indexOf(x) >= 0 })) {
        const roles = message.guild.member(message.author.id).roles.array()
        const accepted = ['Bot Commander', 'Moderator']
        for (let i = 0; i < roles.length; i++) {
          if (accepted.includes(roles[i].name)) {
            return
          }
        }
      }
      message.reply(config.muteWarningMessage.replace('{bannedWord}', bannedWords[word]))
      checkUser(message, config)
    }
  }
})

const checkUser = (message, config) => {
  if (warnedUserIds.includes(message.member.user.id)) {
    addMutedRole(message, config)
  } else {
    warnedUserIds.push(message.member.user.id)
  }
}

const addMutedRole = (message, config) => {
  const role = message.guild.roles.find(role => role.name === config.roleMuted)

  if (!role) {
    console.log('The role ' + config.roleMuted + ' does not exists on this server')
    return
  }

  message.member.addRole(role)
}

function persistWarnedUsers () {
  fs.writeFileSync(`${__dirname}/../core/warneduserids.json`, JSON.stringify(warnedUserIds))
}

setInterval(persistWarnedUsers, 10000)
