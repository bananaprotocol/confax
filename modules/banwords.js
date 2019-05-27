const Confax = require('../bot.js')
const fs = require('fs')
const bot = Confax.bot
const bannedWords = Confax.config.bannedWords
let warnedUserIds = Confax.warnedUserIds

bot.on('message', (message) => {
  if (message.author.bot) return

  let lowercaseMessage = message.content.toLowerCase()

  for (var word in bannedWords) {
    if (lowercaseMessage.includes(bannedWords[word])) {
      message.reply(Confax.config.muteWarningMessage.replace('{bannedWord}', bannedWords[word]))
      checkUser(message)
    }
  }
})

function checkUser (message) {
  if (warnedUserIds.includes(message.member.user.id)) {
    addMutedRole(message)
  } else {
    warnedUserIds.push(message.member.user.id)
  }
}

function addMutedRole (message) {
  let role = message.guild.roles.find(role => role.name === Confax.config.roleMuted)

  if (!role) {
    console.log('The role ' + Confax.config.roleMuted + ' does not exists on this server')
    return
  }

  message.member.addRole(role)
}

function persistWarnedUsers () {
  fs.writeFileSync('warneduserids.json', JSON.stringify(warnedUserIds))
}

setInterval(persistWarnedUsers, 10000)
