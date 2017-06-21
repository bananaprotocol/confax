const Discord = require('discord.js')
const Confax = require('../bot.js')
const unirest = require('unirest')

Confax.registerCommand('cat', 'default', (message) => {
  unirest.get('http://random.cat/meow')
         .end(function (result) {
           var image = 'https://i.imgur.com/Bai6JTL.jpg'
           if (result.status === 200) {
             image = result.body.file
           }
           message.channel.send(image).catch(error => console.log(error.stack))
         })
}, ['kitty'], 'Get a random cat picture', '[]')
