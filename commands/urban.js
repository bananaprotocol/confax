const Discord = require('discord.js')
const Confax = require('../bot.js')

function checkLength (string, length) {
  if (string.length > length) {
    string = string.substring(0, length - 3) + '...'
  }
  return string
}

Confax.registerCommand('urban', 'default', (message) => {
  let options = {
    host: 'api.urbandictionary.com',
    path: '/v0/define?term=' + encodeURIComponent(message.content),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  Confax.getHTTP(options).then(body => {
    body = JSON.parse(body)
    if (body.list.length < 1) {
      message.reply('sorry, but there are no definitions for: **' + message.content + '**')
    } else {
      let embed = new Discord.MessageEmbed()
      embed.setTitle('**' + body.list[0].word + '**')
      embed.setURL(body.list[0].permalink)
      let firstDefinition = body.list[0].definition
      let firstExample = body.list[0].example
      let secondDefinition
      let secondExample

      if (body.list.length > 1) {
        secondDefinition = body.list[1].definition
        secondExample = body.list[1].example
      }

      embed.addField('Definition', checkLength(firstDefinition, 1024))
      if (body.list.length > 1) {
        embed.addField('Second Definition', checkLength(secondDefinition, 1024))
      }
      embed.addField('**Example**', checkLength(firstExample, 1024))
      if (body.list.length > 1) {
        embed.addField('**Second Example**', checkLength(secondExample, 1024))
      }
      message.channel.send(embed)
    }
  })
}, ['urban-dictionary', 'urban-dict', 'ud'], 'Get a definition of a word from Urban Dictionary', '<word>')
