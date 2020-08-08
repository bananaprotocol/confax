const Confax = require('../bot.js')
const fs = require('fs')
const bot = Confax.bot
let warnedUserIds = Confax.warnedUserIds

bot.on('message', (message) => {
  const config = Confax.getConfig(message.guild.id)
  const bannedWords = config.bannedWords

  if (message.author.bot) return

  let lowercaseMessage = message.content.toLowerCase()
  for (var word in bannedWords) {
    if (lowercaseMessage.split(' ').indexOf(bannedWords[word]) > -1) {
      let apiCommands = ['addbannedword', 'abw', 'removebannedword', 'rbw']
      if (apiCommands.some(x => { return lowercaseMessage.indexOf(x) >= 0 })) {
        let roles = message.guild.member(message.author.id).roles.array()
        let accepted = ['Bot Commander', 'Moderator']
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

function checkUser (message, config) {
  if (warnedUserIds.includes(message.member.user.id)) {
    addMutedRole(message, config)
  } else {
    warnedUserIds.push(message.member.user.id)
  }
}

function addMutedRole (message, config) {
  let role = message.guild.roles.find(role => role.name === config.roleMuted)

  if (!role) {
    console.log('The role ' + config.roleMuted + ' does not exists on this server')
    return
  }

  message.member.addRole(role)
}

function persistWarnedUsers () {
  fs.writeFileSync('warneduserids.json', JSON.stringify(warnedUserIds))
}

setInterval(persistWarnedUsers, 10000)
