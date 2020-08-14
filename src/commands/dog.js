const Discord = require('discord.js')
const Confax = require('../bot.js')
const request = require('request')

Confax.registerCommand('dog', 'default', (message) => {
  request('http://random.dog/woof', function (error, response, body) {
    message.channel.send(`http://random.dog/${body}`).catch(err => console.error(err.stack))
  })
}, ['doggo'], 'Get a random dog picture', '[]')
